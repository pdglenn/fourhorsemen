import csv
import json

csvfile = open('one_axis_scatter_data.csv', 'r')
jsonfile = open('one_axis_scatter_data.json', 'w')

fieldnames = ('x','r')
reader = csv.DictReader(csvfile, fieldnames)
out = json.dumps( [ row for row in reader ] )
jsonfile.write(out)