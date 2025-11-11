// scripts/combineABI.js
const fs = require("fs");
const path = require("path");

const contracts = ["FarmRegistry", "ProductRegistry", "ProcessRegistry", "TraceabilityMain"];

const combine = () => {
  console.log("🧩 Bắt đầu gộp ABI...");

  const basePath = path.join(__dirname, "../artifacts/contracts");
  const addrPath = path.join(__dirname, "../deployments/addresses.json");
  const outputPath = path.join(__dirname, "../frontend/src/contracts/TraceabilityCombined.json");

  const addresses = JSON.parse(fs.readFileSync(addrPath, "utf-8"));
  const result = {
    network: addresses.network,
    deployTime: addresses.deployTime,
    contracts: {},
  };

  contracts.forEach((name) => {
    let abiPath;

    if (name === "TraceabilityMain") {
      abiPath = path.join(basePath, `main/${name}.sol/${name}.json`);
    } else {
      abiPath = path.join(basePath, `registries/${name}.sol/${name}.json`);
    }

    const artifact = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
    result.contracts[name] = {
      address: addresses.contracts[name].address,
      abi: artifact.abi,
    };
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

  console.log(`✅ Đã gộp ABI + địa chỉ vào: ${outputPath}`);
};

combine();
