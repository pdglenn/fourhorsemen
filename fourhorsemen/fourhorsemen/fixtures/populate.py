from __future__ import print_function

data = {
    'races': ('race', ['White',
                        'Hispanic, Latino, or Spanish origin',
                        'Black or African-American',
                        'Asian',
                        'American Indian or Alaska Native',
                        'Middle Eastern or North African',
                        'Native Hawaiian or Other Pacific Islander',
                        'Other']),
    'ages': ('age', ['18 - 29',
            '30 - 49',
            '50 - 64',
            '65+']),
    'religions': ('religion', ['Protestant',
                                'Catholic',
                                'Other Christian',
                                'Jewish',
                                'Muslim',
                                'Buddhist',
                                'Hindu',
                                'Atheist',
                                'Unaffiliated',
                                'Other']),
    'genders': ('gender', ['Male',
                            'Female',
                            'Non-Conforming']),
    'orientations': ('orientation', ['Heterosexual or straight',
                                    'Homosexual, Gay, or Lesbian',
                                    'Bisexual',
                                    'I don\'t know',
                                    'Something else',]),
    'socialfrequency': ('frequency', ['Daily',
                                        'Weekly',
                                        'Monthly',
                                        'Rarely/Never',]),
    'socialusage': ('usage', ['Facebook',
                                'Reddit',
                                'Twitter',
                                'Pinterest',
                                'Instagram',
                                'Other',]),
    'socialmost': ('most_used', ['Facebook',
                                'Reddit',
                                'Twitter',
                                'Pinterest',
                                'Instagram',
                                'Other',])
}

text = '''- model: fourhorsemen.{}
  pk: {}
  fields:
    {}: {}\n'''
output = ''

for category, d in data.iteritems():
    output += '# ----- {} ---------\n'.format(category)
    field = d[0]
    for i, value in enumerate(d[1], 1):
        output += text.format(category, i, field, value)
    output += '# ------------------------\n'

with open('initial_data.yaml', 'w+') as f:
    print(output, file=f)
    print(output)
