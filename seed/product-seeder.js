var {Product} = require('../models/product.model');
const db = require('../database/database')

db.connectDB()

const products = [
  new Product({
    "title": "Tricky",
    "price": 799,
    "shortDesc": "Unisex",
    "category": "board",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "skateboard-generic.png"
  }),
  new Product({
    "title": "Flipper",
    "price": 799,
    "shortDesc": "Unisex",
    "category": "board",
    "longDesc": "Axle crailtap fastplant dude regular footed helipop impossible. Wax Jimmy'Z half-flip transfer nollie launch ramp mongo egg plant. Pogo slap maxwell g-turn boneless risers blunt nose slide.",
    "imgFile": "skateboard-generic.png"
  }),
  new Product({
    "title": "Hiphop",
    "price": 799,
    "shortDesc": "Unisex",
    "category": "board",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "skateboard-generic.png"
  }),
  new Product({
    "title": "Gretas Fury",
    "price": 999,
    "shortDesc": "Unisex",
    "category": "board",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "skateboard-greta.png"
  }),
  new Product({
    "title": "Awesome",
    "price": 799,
    "shortDesc": "Unisex",
    "category": "board",
    "longDesc": "Axle crailtap fastplant dude regular footed helipop impossible. Wax Jimmy'Z half-flip transfer nollie launch ramp mongo egg plant. Pogo slap maxwell g-turn boneless risers blunt nose slide.",
    "imgFile": "skateboard-generic.png"
  }),
  new Product({
    "title": "Swag",
    "price": 799,
    "shortDesc": "Unisex",
    "category": "board",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "skateboard-generic.png"
  }),
  new Product({
    "title": "Hoodie",
    "price": 699,
    "shortDesc": "Ash unisex",
    "category": "clothes",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "hoodie-ash.png"
  }),
  new Product({
    "title": "Hoodie",
    "price": 699,
    "shortDesc": "Fire unisex",
    "category": "clothes",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "hoodie-fire.png"
  }),
  new Product({
    "title": "Hoodie",
    "price": 699,
    "shortDesc": "Ocean unisex",
    "category": "clothes",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "hoodie-ocean.png"
  }),
  new Product({
    "title": "Spinner",
    "price": 249,
    "shortDesc": "Soft",
    "category": "wheels",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "wheel-spinner.png"
  }),
  new Product({
    "title": "Wave",
    "price": 249,
    "shortDesc": "Medium",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "wheel-wave.png"
  }),
  new Product({
    "title": "Rocket",
    "price": 299,
    "category": "wheels",
    "shortDesc": "Hard",
    "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
    "imgFile": "wheel-rocket.png"
  })
]

let done = 0

for (let i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++
    if (done === products.length)
      exit()
  })
}

function exit () {
  db.disconnect();
}