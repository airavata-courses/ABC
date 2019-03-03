#!/bin/sh

# sudo pip install --upgrade pip
sudo python -m pip uninstall pip && sudo apt install python-pip --reinstall
sudo pip install -r requirement.txt
python news-application.py >/dev/null 2>&1 &
