#!/bin/bash

# Function to print colored text
print_color() {
    COLOR=$1
    TEXT=$2
    NC='\033[0m' # No Color
    case $COLOR in
        "green") echo -e "\033[0;32m${TEXT}${NC}" ;;
        "yellow") echo -e "\033[1;33m${TEXT}${NC}" ;;
        "blue") echo -e "\033[0;34m${TEXT}${NC}" ;;
        "red") echo -e "\033[0;31m${TEXT}${NC}" ;;
        *) echo "$TEXT" ;;
    esac
}

# --- Start Installation ---
print_color "blue" "=============================================="
print_color "blue" "  KhanhNN Insights - Automatic Installation  "
print_color "blue" "=============================================="
echo

# 1. Check for Node.js and npm
print_color "yellow" "[1/3] Checking for prerequisites..."
if ! command -v npm &> /dev/null
then
    print_color "red" "Error: 'npm' command not found."
    print_color "red" "Please install Node.js and npm before running this script."
    exit 1
else
    print_color "green" "✓ Node.js and npm found."
fi
echo

# 2. Install npm dependencies
print_color "yellow" "[2/3] Installing npm packages..."
if npm install; then
    print_color "green" "✓ npm packages installed successfully."
else
    print_color "red" "Error: Failed to install npm packages. Please check the errors above."
    exit 1
fi
echo

# 3. Setup .env file
print_color "yellow" "[3/3] Setting up environment file (.env)..."
if [ -f ".env" ]; then
    print_color "green" "✓ '.env' file already exists. Skipping creation."
else
    if [ -f "example.env" ]; then
        cp example.env .env
        print_color "green" "✓ '.env' file created from 'example.env'."
    else
        print_color "red" "Error: 'example.env' not found. Cannot create '.env' file."
        exit 1
    fi
fi
echo

# --- Final Instructions ---
print_color "blue" "=============================================="
print_color "green" "  Installation Complete! Next Steps:"
print_color "blue" "=============================================="
echo
print_color "yellow" "1. Configure Firebase:"
echo "   - Go to https://console.firebase.google.com/ and create a project."
echo "   - Add a 'Web App' and copy the Firebase config object."
echo "   - Enable 'Google' as a sign-in provider in Firebase Authentication."
echo "   - Create a 'Firestore Database'."
echo
print_color "yellow" "2. Update your .env file:"
echo "   - Open the '.env' file and paste your Firebase credentials."
echo
print_color "yellow" "3. Set Firestore Rules:"
echo "   - Go to Firestore > Rules and paste the rules from the README.md."
echo
print_color "yellow" "4. Run the application:"
echo "   - Run 'npm run dev' to start the development server."
echo

exit 0
