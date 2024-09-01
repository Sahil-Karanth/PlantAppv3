import gpiod
import firebase_admin
from firebase_admin import credentials, db
import sys
from time import sleep
import schedule

print("imports worked")

LED_PIN = 12
chip = gpiod.Chip('gpiochip4')
led_line = chip.get_line(LED_PIN)
led_line.request(consumer="LED", type=gpiod.LINE_REQ_DIR_OUT)

app_listener_initialised = False
ping_listener_initialised = False
shutdown_listener_initialised = False

serviceAccountKey = {
  "type": "service_account",
  "project_id": "plant-app-d11b6",
  "private_key_id": "7fc8ac5ceb5d4225064e5e670ee08afe376ee474",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzha5RQf3VoNTb\ncCsLjo0/jVLgSYJ7DpU3ABcS04mwyzIlCgYPTg3JDXsyN8uTzgZLE394Se7G9nYD\naud195rxG7yp0gQ9Wa2JON/z1hT7qd1ndksLYIhk3eDsqEnbAp+fk0kw1gSUWvOm\nKf5IAS27Noc0gz8RA3xy8Di42fZ4U15GuH9h1U/nGJUB5KWuY+3Hx+pisTpwxuNo\n6KmTJD0aB3G1NYHzeAIiCTe1yThCW4Lmu5UtT2uXZmpP1IPsH5AIgJpyE/BMlXYd\nDS9ApI37tWdnMMg0jYC05Q0L/0sj+zodQsekYZJctlbJLe9GB2lE65VjFxqdXC14\nJplMClw1AgMBAAECggEAEjEpj0v17lxYPa2B+y+Usjw+ygJBAfniFpsAe5Sqtxr8\nR6MappnlDTr7wUTEsUN3QUvmRrkNRKXMoz+F2Z9AGQ9TwMzKx7HLA2UbUsEeyrr1\nuAqVg79iSwBuDuVl6Jb9OIVLLTL+707BMpU+Uqsl6HsX2/Mx5KY7CgW8ZcUWtC4p\nIOYjcHYy+iV/XcS0T+Ub7opAZMIxtinl6do/YxI7rDE6I4zzK2DPJUrHejiRkHfC\n7jErTkJuVWDsgCnoUWzWP3CpANe6wplnfxeQ3fwqyGc7Q6u66sP1Ey3jIP24UQce\n7sir4BLC9Ga+eCjqodE7k0rg0bWaHKkWQHoBZH9dUQKBgQDb1ntC47EVwcrNxvbE\nDVk1pxadrEpsgdu9dch+hYTlw0cy53Px9i30LLVgPi7oAlLNBsh9P3JmHGMsGQrr\nO0gAQNOEV/IX7WZWc9jCa4CxyLYhB84BDYw0saoQxUPpmVVeqJs8Rme2nOGhj2Xg\nkLW+4aiU1nrvB/CZ2byTVoV3kQKBgQDRDXsyd3exe8GIxhwk7aDKC9nTIBgN2/fu\n55WSrx6zV/0C8HHoBJ0wlEde+Cot04fywHtWeW7K9EzmunK7SJOAFKhvGOY87ZvX\neOctuDgJ7rXuzqvPuDdf9JWCwIbjMcLRMjvqR5C4cZUhMw82qa7bY7xX+uLkO5an\n/4EH/gcwZQKBgQCQxrd2Xa0Jvw5oZles1X2ir99dB1IcE4k7RI49hID5L5l8FKFu\n/8lTvP3V3B3X/W+6RnVSxq34QUmuiO9/6xKH2Cl0RtbQmy+CT9i4cUPX0W7gYdtx\nJhLnwPlXAhKvjKOEK1XQZC15Pef6Fg3pzmNiygnTu0xKjtgM+jAOeDR9gQKBgGqQ\n9LxFKj7PV1jhpHcuq0hTwjZdpeVqvHiMlTKxEnVZ5SAacfZUY8zfyYIf/2Bc9HBK\nrpTmUhQjdRAo+1N9K7Oe1D3N85Abj9XHTBGCVw65IQUbVXoN7ix8AbslaZ1nQGhj\nsyc6VAux2tORs6+pz/kGXnx66C5wMdxx4tSwKfoBAoGAWVR6AZEcTCpyfroM5yTB\nUSQBO3IY6VjHr0eApPxBlol0Zv2cNL397l0qttz3vzHGUQTJOqG080yXstbLTl33\nZEhhSfnZUj+dwHeUBTEgknLQUFJwU+N5GKW2F4GADd1PoxnY8VDQ22YM86wIrFrr\nQcDFaCMYWYkdGqgdR7wtyg0=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-y0wib@plant-app-d11b6.iam.gserviceaccount.com",
  "client_id": "111187030105577891820",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y0wib%40plant-app-d11b6.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

cred = credentials.Certificate(serviceAccountKey)
firebase_admin.initialize_app(
    cred,
    {
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

            schedule.every(10).seconds.do(PerformTimedWatering, seconds_to_water=3)

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

    while True:
        schedule.run_pending()
        sleep(1)

except:
    print("closing relay")
    led_line.release()