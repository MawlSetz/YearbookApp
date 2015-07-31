# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(first: "Meir", last: "Snyder", email: "msny36@gmail.com", password: "password", location: "New York", picture: "http://placekitten.com/g/500/500", github: "msny/github.com", linkedin: "msny/linkedin.com", facebook: "msny.facebook.com", quote: "Quote this", bio: "Lorem ipsum dolor sit amet, mei delicata repudiare repudiandae te, blandit sapientem scriptorem pro te. Oblique suscipiantur eu sea, ex utroque fabellas vel, sale diceret voluptatum ei duo. Affert scriptorem consequuntur ea sed, nam delicatissimi necessitatibus id. Partem putent rationibus sit at, ex tritani honestatis dissentiet est.", skill_primary: "Javascript", skill_secondary: "Angular JS", personal_link: "Meirsnyder.com", twitter_handle: 'msny_36')

User.create(first: "Chris", last: "Black", email: "huckpilot@gmail.com", password: "password", location: "New York", picture: "http://placekitten.com/g/500/500", github: "huckpilot/github.com", linkedin: "huckpilot/linkedin.com", facebook: "huckpilot.facebook.com", quote: "I'm just here to make friends", bio: "Consul verterem id duo, minim erant sit an. No quo dolorum docendi, qui ludus iracundia in. Te eam purto option apeirian, ius eros sententiae disputando an. At probatus maiestatis per, ad vidit iudico conclusionemque usu. Ad natum veniam oporteat vis. Id invidunt necessitatibus has, quo in tale dico.

No facilis vulputate pertinacia mei, purto dolores scaevola duo ex. Viris blandit id quo, paulo maiorum gloriatur et qui. Error putent prompta te per, quod appellantur no nam. No nec timeam delectus ullamcorper.", skill_primary: "UI", skill_secondary: "Javascript", personal_link: "kingsizeshutyourmouth.tumblr.com", twitter_handle: 'huckpilot')

User.create(first: "Aung", last: "Barteaux", email: "aungwaran@gmail.com", password: "password", location: "New York", picture: "http://placekitten.com/g/500/500", github: "https://github.com/aung-barto", linkedin: "https://www.linkedin.com/in/aungbarteaux", facebook: "https://www.facebook.com/", quote: "say something", bio: "Lorem ipsum dolor sit amet, mei delicata repudiare repudiandae te, blandit sapientem scriptorem pro te. Oblique suscipiantur eu sea, ex utroque fabellas vel, sale diceret voluptatum ei duo. Affert scriptorem consequuntur ea sed, nam delicatissimi necessitatibus id. Partem putent rationibus sit at, ex tritani honestatis dissentiet est.
", skill_primary: "CSS", skill_secondary: "Ruby", personal_link: "aung-barto.com", twitter_handle: 'bungteaux')

User.create(first: "Paul", last: "Fielek", email: "paulfielek@gmail.com", password: "password", location: "New York", picture: "http://www.placekitten.com/g/500/500", github: "https://github.com/polskais1", linkedin: "https://www.linkedin.com/in/paulfielek", facebook: "https://www.facebook.com/paulfielek", quote: "Quote Something", bio: "Pour-over authentic twee, narwhal mumblecore meditation hella pickled 90's. Banjo umami sriracha leggings XOXO. Small batch organic Kickstarter, McSweeney's YOLO mumblecore iPhone. Leggings Shoreditch meh cardigan, viral tote bag gastropub VHS pug meggings messenger bag you probably haven't heard of them bitters Echo Park. Flexitarian High Life next level, you probably haven't heard of them Austin butcher gluten-free retro farm-to-table art party +1. Actually tousled Bushwick readymade, hoodie food truck fingerstache cliche Austin vinyl PBR Intelligentsia. Ugh farm-to-table 3 wolf moon, narwhal Vice cray normcore.", skill_primary: "Node", skill_secondary: "Rails", personal_link: "http://www.paulfielek.com", twitter_handle: 'polskais1')

User.create(first: "Molly", last: "Setzer", email: "molly.setzer@gmail.com", password: "password", location: "New York", picture: "http://www.placekitten.com/g/500/500", github: "https://github.com/MawlSetz", linkedin: "https://www.linkedin.com/in/MollySetzer", facebook: "https://www.facebook.com/setzerml", quote: "say something", bio: "Lorem ipsum dolor sit amet, mei delicata repudiare repudiandae te, blandit sapientem scriptorem pro te. Oblique suscipiantur eu sea, ex utroque fabellas vel, sale diceret voluptatum ei duo. Affert scriptorem consequuntur ea sed, nam delicatissimi necessitatibus id. Partem putent rationibus sit at, ex tritani honestatis dissentiet est. Consul verterem id duo, minim erant sit an. No quo dolorum docendi, qui ludus iracundia in. Te eam purto option apeirian, ius eros sententiae disputando an. At probatus maiestatis per, ad vidit iudico conclusionemque usu. Ad natum veniam oporteat vis. Id invidunt necessitatibus has, quo in tale dico.", skill_primary: "Javascript", skill_secondary: "Ruby", personal_link: "http://mollysetzer.squarespace.com", twitter_handle: 'mawl_setz')

Post.create(user_id: 1, vote: 0, content: "Lorem ipsum dolor sit amet, praesent maluisset ne vel. Eos populo recusabo theophrastus cu, purto postea vis te. Cum te causae virtute. Ad sit exerci option, modo nostrum interpretaris ne mei.", tags: "First")
Post.create(user_id: 5, vote: 0, content: "Lorem ipsum dolor sit amet, praesent maluisset ne vel. Eos populo recusabo theophrastus cu, purto postea vis te. Cum te causae virtute. Ad sit exerci option, modo nostrum interpretaris ne mei.
  
Has no posse invenire intellegebat, sit ea instructior contentiones reprehendunt. Id per mazim sententiae. 
", tags: "Second")
Post.create(user_id: 2, vote: 0, content: "Lorem ipsum dolor sit amet, praesent maluisset ne vel. Eos populo recusabo theophrastus cu, purto postea vis te. Cum te causae virtute. Ad sit exerci option, modo nostrum interpretaris ne mei.", tags: "Third")
Post.create(user_id: 1, vote: 0, content: "Usu et movet audiam antiopam, oporteat sententiae in vix. Id duo suas stet, natum concludaturque ad vis. Ipsum audiam gubergren sea no, cu sea scripta phaedrum. No sumo apeirian eam, eum nihil prodesset te. Te dolorem accusamus has, qui cu graecis definitiones, ea nam postea percipitur. Cum et liber iisque apeirian, utinam labore nam in, vim eu magna facilisi.", tags: "Four")


Comment.create(post_id: 1, vote: 0, text: "This post is awesome post 1", user_id: 4)
Comment.create(post_id: 1, vote: 0, text: "This post is awesome post 1", user_id: 1)
Comment.create(post_id: 2, vote: 0, text: "This post is awesome post 2", user_id: 4)
Comment.create(post_id: 3, vote: 0, text: "This post is awesome post 3", user_id: 2)
Comment.create(post_id: 4, vote: 0, text: "This post is awesome post 4", user_id: 1)
