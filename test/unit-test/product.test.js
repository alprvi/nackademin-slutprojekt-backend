var expect = require('chai').expect;
var should = require('chai').should();
const Product = require('../../models/product.model')
const Database = require('../../database/database')

describe('Product Model', () => {
  before(async () => {
    await Database.connectDB()
  })

  after(async () => {
    await Database.disconnectDB()
  })

  beforeEach(async function () {
    await Database.clearDatabase()

    let product1 = {
      "title": "perspiciatis provident aliquid",
      "price": 799999,
      "shortDesc": "Unisex",
      "category": "board",
      "longDesc": "Fugiat consectetur necessitatibus autem impedit eveniet itaque et.",
      "imgFile": "skateboard-generic.png"
    }
    let product2 = {
      "title": "ut quia voluptatem",
      "price": 999,
      "shortDesc": "Unisex",
      "category": "board",
      "longDesc": "Vel nulla voluptas officiis libero distinctio sapiente et ea.",
      "imgFile": "skateboard-generic.png"
    }

    this.result1 = await Product.createProduct(product1)
    this.result2 = await Product.createProduct(product2)
  })
  it('should create a product', async () => {
    let product = {
      "title": "Tricky",
      "price": 799999,
      "shortDesc": "Unisex",
      "category": "board",
      "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
      "imgFile": "skateboard-generic.png"
    }

    const result = await Product.createProduct(product)

    result.should.have.property('title').equal('Tricky')
  })

  it('should get a product', async  function () {
    const resultGetProduct =  await Product.getProduct(this.result2._id)

    resultGetProduct.should.have.property('title').equal('ut quia voluptatem')
    resultGetProduct.should.be.an('object')
  })

  it('should get all products', async function(){
    const allProduct = await Product.getProducts()

    allProduct.should.have.lengthOf(2)
    allProduct[0].should.have.property('title').equal('perspiciatis provident aliquid')
  })

})