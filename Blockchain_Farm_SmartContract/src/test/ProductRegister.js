const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductRegistry", function () {
  let ProductRegistry, productRegistry, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    ProductRegistry = await ethers.getContractFactory("ProductRegistry");
    productRegistry = await ProductRegistry.deploy();
    await productRegistry.waitForDeployment();
  });

  it("should register a new product", async function () {
    await productRegistry.registerProduct(
      "FARM001",
      "PROD001",
      "Gạo ST25",
      "Lương thực",
      100,
      20000,
      "Gạo ngon nhất thế giới",
      "https://ipfs.io/ipfs/example"
    );

    const product = await productRegistry.getProduct("PROD001");
    expect(product.name).to.equal("Gạo ST25");
    expect(product.categoryName).to.equal("Lương thực");
    expect(product.price).to.equal(20000);
  });

  it("should update product quantity and price", async function () {
    await productRegistry.registerProduct(
      "FARM001",
      "PROD002",
      "Cam sành",
      "Trái cây",
      50,
      15000,
      "Cam ngọt",
      "https://ipfs.io/ipfs/example2"
    );

    await productRegistry.updateProduct("PROD002", 80, 18000);
    const updated = await productRegistry.getProduct("PROD002");
    expect(updated.quantity).to.equal(80);
    expect(updated.price).to.equal(18000);
  });

  it("should update product category", async function () {
    await productRegistry.registerProduct(
      "FARM002",
      "PROD003",
      "Cà phê robusta",
      "Nông sản",
      200,
      30000,
      "Cà phê nguyên chất",
      "https://ipfs.io/ipfs/example3"
    );

    await productRegistry.updateCategory("PROD003", "Đồ uống");
    const updated = await productRegistry.getProduct("PROD003");
    expect(updated.categoryName).to.equal("Đồ uống");

    // kiểm tra danh mục mới có chứa sản phẩm
    const drinks = await productRegistry.getProductsByCategory("Đồ uống");
    expect(drinks.length).to.equal(1);
    expect(drinks[0].productCode).to.equal("PROD003");
  });
});
