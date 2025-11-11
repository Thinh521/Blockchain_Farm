const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BusinessRegistry", function () {
  let BusinessRegistry, businessRegistry, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    BusinessRegistry = await ethers.getContractFactory("BusinessRegistry");
    businessRegistry = await BusinessRegistry.deploy();
    await businessRegistry.waitForDeployment();
  });

  it("should register a new business", async function () {
    const regNumber = "BIZ123";
    const images = ["ipfs://image1", "ipfs://image2"];
    const businessType = "Hộ kinh doanh";

    const tx = await businessRegistry.registerBusiness(
      "Test Business",
      addr1.address,
      regNumber,
      "Hanoi",
      businessType,
      images
    );

    const receipt = await tx.wait();
    const event = receipt.logs.find(log =>
      log.fragment && log.fragment.name === "BusinessRegistered"
    );
    expect(event).to.not.be.undefined;

    // Lấy lại id từ hash
    const businessId = ethers.keccak256(ethers.toUtf8Bytes(regNumber));

    // Lấy business từ contract
    const business = await businessRegistry.getBusiness(businessId);

    expect(business.id).to.equal(businessId);
    expect(business.name).to.equal("Test Business");
    expect(business.wallet).to.equal(addr1.address);
    expect(business.registrationNumber).to.equal(regNumber);
    expect(business.location).to.equal("Hanoi");
    expect(business.businessType).to.equal(businessType);
    expect(business.images.length).to.equal(2);
    expect(business.images[0]).to.equal(images[0]);
    expect(business.isRegistered).to.equal(true);
  });

  it("should revert if registering with existing regNumber", async function () {
    const regNumber = "BIZ999";
    const images = ["ipfs://image1"];

    await businessRegistry.registerBusiness(
      "Biz A",
      addr1.address,
      regNumber,
      "HCM",
      "Công ty TNHH",
      images
    );

    await expect(
      businessRegistry.registerBusiness(
        "Biz B",
        addr1.address,
        regNumber, // dùng lại số đăng ký
        "Hanoi",
        "Hộ kinh doanh",
        images
      )
    ).to.be.revertedWith("Business already registered");
  });

  it("should get business by regNumber", async function () {
    const regNumber = "BIZ456";
    const images = ["ipfs://img"];
    const businessType = "Công ty TNHH";

    await businessRegistry.registerBusiness(
      "Biz C",
      addr1.address,
      regNumber,
      "Da Nang",
      businessType,
      images
    );

    const business = await businessRegistry.getBusinessByRegNumber(regNumber);
    expect(business.name).to.equal("Biz C");
    expect(business.businessType).to.equal(businessType);
  });

  it("should revert if wallet is zero address", async function () {
    const regNumber = "BIZ777";
    const images = [];

    await expect(
      businessRegistry.registerBusiness(
        "Invalid Biz",
        ethers.ZeroAddress,
        regNumber,
        "Hue",
        "Hộ cá thể",
        images
      )
    ).to.be.revertedWith("Invalid wallet address");
  });

  it("should revert when getting non-existent business", async function () {
    const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE"));
    await expect(businessRegistry.getBusiness(fakeId)).to.be.revertedWith("Business not found");
    await expect(businessRegistry.getBusinessByRegNumber("FAKE")).to.be.revertedWith("Business not found");
  });
});
