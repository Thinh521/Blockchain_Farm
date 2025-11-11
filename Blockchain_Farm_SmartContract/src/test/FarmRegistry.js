const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FarmRegistry", function () {
  let companyRegistry, farmRegistry, owner, addr1;

  const regNumber = "REG-888888";
  const companyName = "AgriTech Ltd";
  const companyLocation = "Da Nang, Vietnam";

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy CompanyRegistry
    const CompanyRegistry = await ethers.getContractFactory("CompanyRegistry");
    companyRegistry = await CompanyRegistry.deploy();
    await companyRegistry.deployed();

    // Deploy FarmRegistry
    const FarmRegistry = await ethers.getContractFactory("FarmRegistry");
    farmRegistry = await FarmRegistry.deploy(companyRegistry.address);
    await farmRegistry.deployed();
  });

  async function registerCompany() {
    const tx = await companyRegistry.registerCompany(
      companyName,
      owner.address,
      regNumber,
      companyLocation,
      ["ipfs://comp1", "ipfs://comp2"]
    );
    await tx.wait();
  }

  it("should not allow registering farm if company not registered", async function () {
    await expect(
      farmRegistry.registerFarm(
        "FARM001",
        "Nguyen Van A",
        "Green Farm",
        regNumber, // nhưng công ty chưa đăng ký
        "a@email.com",
        "0123456789",
        "Farm mô tả",
        "Hanoi",
        500,
        []
      )
    ).to.be.revertedWith("Company not found"); // vì getCompany sẽ revert
  });

  it("should register a farm linked with a company", async function () {
    await registerCompany();

    const farmCode = "FARM001";
    await farmRegistry.registerFarm(
      farmCode,
      "Nguyen Van A",
      "Green Farm",
      regNumber,
      "a@email.com",
      "0123456789",
      "Farm rau sạch",
      "Hanoi",
      1000,
      ["ipfs://farm1", "ipfs://farm2"]
    );

    const farm = await farmRegistry.getFarm(farmCode);

    expect(farm.farmCode).to.equal(farmCode);
    expect(farm.nameFarm).to.equal("Green Farm");
    expect(farm.fullname).to.equal("Nguyen Van A");
    expect(farm.location).to.equal("Hanoi");
    expect(farm.exists).to.equal(true);
  });

  it("should not allow duplicate farmCode", async function () {
    await registerCompany();

    const farmCode = "FARM001";
    await farmRegistry.registerFarm(
      farmCode,
      "Nguyen Van A",
      "Green Farm",
      regNumber,
      "a@email.com",
      "0123456789",
      "Farm rau sạch",
      "Hanoi",
      1000,
      []
    );

    await expect(
      farmRegistry.registerFarm(
        farmCode,
        "Tran Van B",
        "Fruit Farm",
        regNumber,
        "b@email.com",
        "0999999",
        "Farm trái cây",
        "HCM",
        2000,
        []
      )
    ).to.be.revertedWith("Farm already exists");
  });

  it("should return farms by regNumber", async function () {
    await registerCompany();

    await farmRegistry.registerFarm(
      "FARM001",
      "Nguyen Van A",
      "Green Farm",
      regNumber,
      "a@email.com",
      "0123456789",
      "Farm rau",
      "Hanoi",
      500,
      []
    );

    await farmRegistry.registerFarm(
      "FARM002",
      "Tran Thi B",
      "Fruit Farm",
      regNumber,
      "b@email.com",
      "0988",
      "Farm trái cây",
      "HCM",
      1500,
      []
    );

    const farms = await farmRegistry.getFarmsByRegNumber(regNumber);

    expect(farms.length).to.equal(2);
    expect(farms[0].farmCode).to.equal("FARM001");
    expect(farms[1].farmCode).to.equal("FARM002");
  });

  it("should return all farms", async function () {
    await registerCompany();

    await farmRegistry.registerFarm(
      "FARM001",
      "Nguyen Van A",
      "Green Farm",
      regNumber,
      "a@email.com",
      "0123456789",
      "Farm rau",
      "Hanoi",
      500,
      []
    );

    await farmRegistry.registerFarm(
      "FARM002",
      "Tran Thi B",
      "Fruit Farm",
      regNumber,
      "b@email.com",
      "0988",
      "Farm trái cây",
      "HCM",
      1500,
      []
    );

    const farms = await farmRegistry.getAllFarms();
    expect(farms.length).to.equal(2);
  });
});
