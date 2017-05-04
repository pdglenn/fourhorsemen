import csv
import json

csvfile = open('bar_with_mouseover_data.csv', 'r')
jsonfile = open('bar_with_mouseover_data.json', 'w')

fieldnames = ('x','a','b','c','d','e','f','g')
reader = csv.DictReader(csvfile, fieldnames)
out = json.dumps( [ row for row in reader ] )
jsonfile.write(out)