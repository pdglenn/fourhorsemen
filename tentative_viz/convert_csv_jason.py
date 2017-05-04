import csv
import json

csvfile = open('bar_chart_data.csv', 'r')
jsonfile = open('bar_chart_data.json', 'w')

fieldnames = ('x','y')
reader = csv.DictReader(csvfile, fieldnames)
out = json.dumps( [ row for row in reader ] )
jsonfile.write(out)