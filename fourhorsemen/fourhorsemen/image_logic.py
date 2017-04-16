import random
def get_experimental_group():
    groups = ['moderators', 'algorithmic', 'generic', 'no_flag', 'users']
    return random.choice(groups)


def get_random_image(request):
    images = ['26000_unreported_sexual.jpg',
              'all_of_these.jpg', 
              'at_least_the.jpg', 
              'brb_pewdiepie_gotta.jpg',
              'globalist_pigs_like.jpg',
              'hillaryclinton_kill_yourself.jpg',
              'jews_are_the.jpg',
              'my_family_and.jpg', 
              'realdonaldtrump_kill_yourself.jpg', 
              'the_little_mexican.jpg', 
              'there_is_no.jpg', 
              'these_nyc_kikes.jpg', 
              'this_is_the.jpg', 
              'trannies_your_families.jpg', 
              'two_men_can.jpg', 
              'user1_user2_yes.jpg', 
              'user_die_in.jpg', 
              'user_has_a.jpg', 
              'user_youre_why.jpg', 
              'we_must_secure.jpg', 
              'what_do_you.jpg', 
              'white_supremacy_is.jpg', 
              'who_has_more.jpg', 
              'wishing_everyone_a.jpg', 
              'women_are_naturally.jpg']
    chosen = request.session.get('images_seen', [])
    image = random.choice(images)
    while image in chosen:
        image = random.choice(images)
    
    return 'img/{0}/{0}-{1}'.format(request.session.get('exp_group', 'generic'), image)




if __name__ == '__main__':
    print get_experimental_group()
