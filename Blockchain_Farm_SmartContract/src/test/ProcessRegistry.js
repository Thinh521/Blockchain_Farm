const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProcessRegistry", function () {
  let ProcessRegistry, processRegistry;
  const productCode = "P001";

  beforeEach(async function () {
    ProcessRegistry = await ethers.getContractFactory("ProcessRegistry");
    processRegistry = await ProcessRegistry.deploy();
    await processRegistry.deployed();
  });

  it("should add and retrieve farming process", async function () {
    await processRegistry.addFarmingProcess(productCode, "Plowing field");
    await processRegistry.addFarmingProcess(productCode, "Sowing seeds");

    const [farmingProcesses] = await processRegistry.getAllProcesses(productCode);

    expect(farmingProcesses.length).to.equal(2);
    expect(farmingProcesses[0].activity).to.equal("Plowing field");
    expect(farmingProcesses[1].activity).to.equal("Sowing seeds");
  });

  it("should add and retrieve medicine usage", async function () {
    await processRegistry.addMedicine(productCode, "Antibiotic", "2 doses");
    await processRegistry.addMedicine(productCode, "Vitamin C", "Daily");

    const [, medicines] = await processRegistry.getAllProcesses(productCode);

    expect(medicines.length).to.equal(2);
    expect(medicines[0].medicineName).to.equal("Antibiotic");
    expect(medicines[0].usageDetails).to.equal("2 doses");
    expect(medicines[1].medicineName).to.equal("Vitamin C");
  });

  it("should add and retrieve fertilizer usage", async function () {
    await processRegistry.addFertilizer(productCode, "NPK", "50kg per hectare");

    const [, , fertilizers] = await processRegistry.getAllProcesses(productCode);

    expect(fertilizers.length).to.equal(1);
    expect(fertilizers[0].fertilizerType).to.equal("NPK");
    expect(fertilizers[0].usageDetails).to.equal("50kg per hectare");
  });

  it("should add and retrieve harvest info", async function () {
    await processRegistry.addHarvest(productCode, 100, "High quality");

    const [, , , harvests] = await processRegistry.getAllProcesses(productCode);

    expect(harvests.length).to.equal(1);
    expect(harvests[0].quantity).to.equal(100);
    expect(harvests[0].quality).to.equal("High quality");
  });

  it("should add and retrieve distribution info", async function () {
    await processRegistry.addDistribution(productCode, "Ho Chi Minh", "Transport Co");

    const [, , , , distributions] = await processRegistry.getAllProcesses(productCode);

    expect(distributions.length).to.equal(1);
    expect(distributions[0].location).to.equal("Ho Chi Minh");
    expect(distributions[0].handler).to.equal("Transport Co");
  });

  it("should retrieve all processes for a product", async function () {
    await processRegistry.addFarmingProcess(productCode, "Plowing");
    await processRegistry.addMedicine(productCode, "Antibiotic", "1 dose");
    await processRegistry.addFertilizer(productCode, "NPK", "50kg");
    await processRegistry.addHarvest(productCode, 200, "Premium");
    await processRegistry.addDistribution(productCode, "Hanoi", "Distributor A");

    const [farming, medicines, fertilizers, harvests, distributions] =
      await processRegistry.getAllProcesses(productCode);

    expect(farming.length).to.equal(1);
    expect(medicines.length).to.equal(1);
    expect(fertilizers.length).to.equal(1);
    expect(harvests.length).to.equal(1);
    expect(distributions.length).to.equal(1);

    expect(farming[0].activity).to.equal("Plowing");
    expect(medicines[0].medicineName).to.equal("Antibiotic");
    expect(fertilizers[0].fertilizerType).to.equal("NPK");
    expect(harvests[0].quantity).to.equal(200);
    expect(distributions[0].location).to.equal("Hanoi");
  });
});
