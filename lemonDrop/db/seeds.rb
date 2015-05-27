# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(first: "Meir", last: "Snyder", email: "msny36@gmail.com", password: "password", location: "New York", picture: "http://placekitten.com/200/287", github: "msny/github.com", linkedin: "msny/linkedin.com", facebook: "msny.facebook.com", quote: "Quote this", bio: "This is meir's bio", skill_primary: "Javascript", skill_secondary: "Angular JS", personal_link: "Meirsnyder.com")

User.create(first: "Christopher", last: "Black", email: "huckpilot@gmail.com", password: "password", location: "New York", picture: "http://placekitten.com/200/287", github: "huckpilot/github.com", linkedin: "huckpilot/linkedin.com", facebook: "huckpilot.facebook.com", quote: "I'm just here to make friends", bio: "This is Chris's bio", skill_primary: "UI", skill_secondary: "Javascript", personal_link: "kingsizeshutyourmouth.tumblr.com")

User.create(first: "Aung", last: "Barteaux", email: "aungwaran@gmail.com", password: "password", location: "New York", picture: "pic.jpg", github: "https://github.com/aung-barto", linkedin: "https://www.linkedin.com/in/aungbarteaux", facebook: "https://www.facebook.com/", quote: "say something", bio: "this is aung", skill_primary: "CSS", skill_secondary: "Ruby", personal_link: "aung-barto.com")

User.create(first: "Paul", last: "Fielek", email: "paulfielek@gmail.com", password: "password", location: "New York", picture: "http://www.placekitten.com/500/600", github: "https://github.com/polskais1", linkedin: "https://www.linkedin.com/in/paulfielek", facebook: "https://www.facebook.com/paulfielek", quote: "Quote Something", bio: "Pour-over authentic twee, narwhal mumblecore meditation hella pickled 90's. Banjo umami sriracha leggings XOXO. Small batch organic Kickstarter, McSweeney's YOLO mumblecore iPhone. Leggings Shoreditch meh cardigan, viral tote bag gastropub VHS pug meggings messenger bag you probably haven't heard of them bitters Echo Park. Flexitarian High Life next level, you probably haven't heard of them Austin butcher gluten-free retro farm-to-table art party +1. Actually tousled Bushwick readymade, hoodie food truck fingerstache cliche Austin vinyl PBR Intelligentsia. Ugh farm-to-table 3 wolf moon, narwhal Vice cray normcore.", skill_primary: "Node", skill_secondary: "Rails", personal_link: "http://www.paulfielek.com")

Post.create(user_id: 1, vote: 2, content: "This is some content", tags: "First")

Comment.create(post_id: 1, vote: 1, content: "This post is awesome", user_id: 1)