from gpiozero import LED
from time import sleep

# Define the GPIO pin connected to the relay
relay_pin = 12

# Set up the relay pin
relay = LED(relay_pin)

try:
    # Turn the relay on (activate the valve)
    relay.on()
    print("Valve is ON")
    sleep(5)  # Keep the valve on for 5 seconds

    # Turn the relay off (deactivate the valve)
    relay.off()
    print("Valve is OFF")
    sleep(5)  # Keep the valve off for 5 seconds

finally:
    # Clean up
    relay.close()



