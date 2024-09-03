import gpiod
import firebase_admin
from firebase_admin import credentials, db, storage
import sys
from time import sleep
import schedule
from picamera2 import Picamera2, Preview

print("imports worked")

LED_PIN = 12
chip = gpiod.Chip('gpiochip4')
led_line = chip.get_line(LED_PIN)
led_line.request(consumer="LED", type=gpiod.LINE_REQ_DIR_OUT)

app_listener_initialised = False
ping_listener_initialised = False
shutdown_listener_initialised = False
camera_listener_initialised = False

serviceAccountKey = {
  
} # SECRET! ADD YOUR OWN SERVICE ACCOUNT KEY HERE


cred = credentials.Certificate(serviceAccountKey)
firebase_admin.initialize_app(
    cred,
    {
        'storageBucket': 'plant-app-d11b6.appspot.com',
        'databaseURL': 'https://plant-app-d11b6-default-rtdb.europe-west1.firebasedatabase.app/'
    }
)


print("firebase setup worked")

def ReceiveAppSignal(event):

    global app_listener_initialised

    if not app_listener_initialised:
        app_listener_initialised = True
        return

    if not event.data:
        print("STOPPING WATERING / SCHEDULE")
        led_line.set_value(0)
        schedule.clear()

    else:

        mode = db.reference('/mode').get()

        if mode == "manual":
            print("STARTING MANUAL WATERING")
            led_line.set_value(1)

        elif mode == "timed":

            days = db.reference('/days').get()
            print("STARTING TIMED WATERING: ", days)

            for day in days:
                getattr(schedule.every(), day.lower()).at("12:00").do(PerformTimedWatering, seconds_to_water=3)


    db.reference("/pi_signal").set(event.data)


def ReceiveAppPing(event):

    global ping_listener_initialised

    if not ping_listener_initialised:
        ping_listener_initialised = True
        return

    print("ping received")

    db.reference("/response_pi_pong").set(event.data)

    with open("/sys/class/thermal/thermal_zone0/temp", "r") as file:
        temp_raw = file.read()
        temp = f"{str(temp_raw)[0:2]}.{str(temp_raw)[3:]}"
        print(temp)
        db.reference("/pi_cpu_response").set(float(temp.strip()))

def ReceiveShutdownSignal(event):

    global shutdown_listener_initialised

    if not shutdown_listener_initialised:
        shutdown_listener_initialised = True
        return

    if event.data:
        print("SHUTTING DOWN")
        db.reference("/shutdown_pi_signal").set(True)
        sys.exit()


def ReceiveCameraSignal(event):

    # ADD CODE HERE TO TAKE PHOTO AND SAVE IMAGE

    global camera_listener_initialised

    if not camera_listener_initialised:
        camera_listener_initialised = True
        return

    picam2 = Picamera2()
    camera_config = picam2.create_preview_configuration()
    picam2.configure(camera_config)
    picam2.start()
    sleep(2)
    picam2.capture_file("latest_image.jpg")
    picam2.close()

    bucket = storage.bucket()
    filename = "latest_image.jpg"

    blob = bucket.blob(filename)
    blob.upload_from_filename(filename)

    print("new picture uploaded")


def PerformTimedWatering(seconds_to_water):

    print("DOING SCHEDULED WATERING")
    led_line.set_value(1)
    sleep(seconds_to_water)
    led_line.set_value(0)
    print("FINISHED SCHEDULED WATERING")


# main

try:

    app_signal_subscription = db.reference('/app_signal').listen(ReceiveAppSignal)
    ping_pong_subscription = db.reference('/response_app_ping').listen(ReceiveAppPing)
    shutdown_signal = db.reference('/shutdown_app_signal').listen(ReceiveShutdownSignal)
    camera_signal = db.reference('/camera_app_signal').listen(ReceiveCameraSignal)

    while True:
        schedule.run_pending()
        sleep(1)

except:
    print("closing relay")
    led_line.release()