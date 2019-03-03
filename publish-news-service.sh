#!/bin/sh

pip install --upgrade pip
pip install --user -r requirement.txt
python news-application.py >/dev/null 2>&1 &
