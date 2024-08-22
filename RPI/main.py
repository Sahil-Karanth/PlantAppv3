import firebase_admin
from firebase_admin import credentials, db
import sys

app_listener_initialised = False
ping_listener_initialised = False
shutdown_listener_initialised = False
cred = credentials.Certificate("RPI/serviceAccountKey.json")
firebase_admin.initialize_app(
    cred,
    {
        'databaseURL': 'https://plant-app-d11b6-default-rtdb.europe-west1.firebasedatabase.app/'
    }
)

def ReceiveAppSignal(event):

    global app_listener_initialised

    if not app_listener_initialised:
        app_listener_initialised = True
        return

    if not event.data:
        print("STOPPING WATERING")
    
    else:
    
        mode = db.reference('/mode').get()

        if mode == "manual":
            print("STARTING MANUAL WATERING")
            
        elif mode == "timed":

            days = db.reference('/days').get()
            print("STARTING TIMED WATERING: ", days)

    db.reference("/pi_signal").set(event.data)

def ReceiveAppPing(event):

    global ping_listener_initialised

    if not ping_listener_initialised:
        ping_listener_initialised = True
        return
    
    print("ping received")

    db.reference("/response_pi_pong").set(event.data)

def ReceiveShutdownSignal(event):

    print("attempting to shutdown pi")
    
    global shutdown_listener_initialised

    if not shutdown_listener_initialised:
        shutdown_listener_initialised = True
        return

    if event.data:
        print("SHUTTING DOWN")
        db.reference("/shutdown_pi_signal").set(True)
        sys.exit()


app_signal_subscription = db.reference('/app_signal').listen(ReceiveAppSignal)
ping_pong_subscription = db.reference('/response_app_ping').listen(ReceiveAppPing)
shutdown_signal = db.reference('/shutdown_app_signal').listen(ReceiveShutdownSignal)


