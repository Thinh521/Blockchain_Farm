const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CompanyRegistry", function () {
  let CompanyRegistry, registry, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    CompanyRegistry = await ethers.getContractFactory("CompanyRegistry");
    registry = await CompanyRegistry.deploy();
    await registry.deployed();
  });

  it("should register a new company with multiple images", async function () {
    const companyName = "ABC Corp";
    const wallet = addr1.address;
    const regNumber = "REG-123";
    const location = "Hanoi";
    const images = ["ipfs://Qm123abc", "ipfs://Qm456def"]; // ví dụ hash IPFS

    // Gọi hàm registerCompany
    const tx = await registry.registerCompany(
      companyName,
      wallet,
      regNumber,
      location,
      images
    );
    const receipt = await tx.wait();

    // Lấy id từ hash
    const companyId = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string"], [regNumber])
    );

    // Check event
    const event = receipt.events.find((e) => e.event === "CompanyRegistered");
    expect(event.args.name).to.equal(companyName);
    expect(event.args.wallet).to.equal(wallet);
    expect(event.args.registrationNumber).to.equal(regNumber);
    expect(event.args.location).to.equal(location);
    expect(event.args.images[0]).to.equal(images[0]);

    // Lấy thông tin công ty từ SC
    const company = await registry.getCompany(companyId);
    expect(company.name).to.equal(companyName);
    expect(company.wallet).to.equal(wallet);
    expect(company.registrationNumber).to.equal(regNumber);
    expect(company.images.length).to.equal(2);
    expect(company.images[1]).to.equal(images[1]);
  });

  it("should not allow duplicate registration number", async function () {
    const images = ["ipfs://Qm111"];
    await registry.registerCompany(
      "First Co",
      addr1.address,
      "DUP-001",
      "Saigon",
      images
    );

    await expect(
      registry.registerCompany(
        "Second Co",
        addr1.address,
        "DUP-001",
        "Hanoi",
        images
      )
    ).to.be.revertedWith("Company already registered");
  });
});
