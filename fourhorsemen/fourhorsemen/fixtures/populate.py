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
                                'Other',]),
    'howharassing': ('harassing', ["Not at all harassing",
                                    "Slightly harassing",
                                    "Somewhat harassing",
                                    "Very harassing",
                                    "Extremely harassing"]),
    'howabusive': ('abusive', ["Not at all abusive",
                                    "Slightly abusive",
                                    "Somewhat abusive",
                                    "Very abusive",
                                    "Extremely abusive"]),
    'howappropriate': ('appropriate', ["Asolutely inappropriate",
                                    "Inappropriate",
                                    "Slightly inappropriate",
                                    "Neutral",
                                    "Slightly appropriate",
                                    "Appropriate",
                                    "Absolutely appropriate"]),
    'howoften': ('often', ["Never", "Rarely", "Occasionally", 
                             "A moderate amount", "A great deal"]),
    'whichremediation': ('remediation', ["Take no action", 
                                        "Remove the message from the platform and take no further action",
                                        "Before the user can post the message, notify them it has been deemed potentially abusive or harassing by an automated system and require confirmation to post it",
                                        "Add poster to a block-list which hides their posts from all subscribers to that block-list",
                                        "Prevent the user from posting again until they complete an empathy exercise",
                                        "Activate a bot which targets offensive comments to the poster for 12 hours",
                                        "Send the poster a private reminder of community code of conduct",
                                        "Post an attention-grabbing anti-bullying message directed at the poster",
                                        "Publicly flag the poster's profile indicating the user posted harassing content",
                                        "Temporarily suspend the poster",
                                        "Permanently ban the poster"]),
    'howsevere': ('severe', ["Not at all severe", "Slightly severe",
                              "Somewhat severe", "Moderately severe",
                              "Extremely severe"])
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
