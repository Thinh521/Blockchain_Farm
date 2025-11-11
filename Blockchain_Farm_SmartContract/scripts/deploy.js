const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying all Traceability contracts...");

  // ===== Deploy Main =====
  const TraceabilityMain = await hre.ethers.getContractFactory("src/contracts/TraceabilityMain.sol:TraceabilityMain");
  const main = await TraceabilityMain.deploy();
  await main.waitForDeployment();
  console.log("✅ TraceabilityMain:", main.target);

  // ===== Save addresses =====
  const contracts = {
    network: hre.network.name,
    deployTime: new Date().toISOString(),
    contracts: {
      TraceabilityMain: { address: main.target },
    },
  };

  const outputPath = path.join(__dirname, "../deployments/addresses.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(contracts, null, 2));
  console.log(`💾 Saved addresses to ${outputPath}`);

  // ===== Verify (optional) =====
  if (hre.network.name !== "localhost") {
    console.log("⏳ Waiting 30s for blockchain indexing...");
    await new Promise((res) => setTimeout(res, 30000));

    console.log("🔍 Verifying contracts on Etherscan...");
    const contractsToVerify = [
      main,
    ];

    for (const c of contractsToVerify) {
      try {
        await hre.run("verify:verify", { address: c.target, constructorArguments: [] });
        console.log(`✅ Verified: ${c.target}`);
      } catch (err) {
        console.log(`⚠️ Skip verify ${c.target}:`, err.message);
      }
    }
  } else {
    console.log("🧪 Localhost network detected → skip verify");
  }
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
