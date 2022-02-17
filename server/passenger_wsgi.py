import imp
import os
import sys
from server import app

sys.path.insert(0, os.path.dirname(__file__))

wsgi = imp.load_source('wsgi', 'server.py')
application = app
