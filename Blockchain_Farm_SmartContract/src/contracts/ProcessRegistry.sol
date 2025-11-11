// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ProcessRegistry {
    struct FarmingProcess {
        string detail;
        string nameProcess;
        string source;
        string plantingDate;
        string[] images; // 🆕 Danh sách ảnh minh chứng
        uint256 timestamp;
    }

    struct Medicine {
        string nameMedicine;
        string quantity;
        string medicineDate;
        string medicineType;
        string applicationMethod;
        string[] images; // 🆕 Danh sách ảnh minh chứng
        uint256 timestamp;
    }

    struct Fertilizer {
        string nameFertilizer;
        string quantity;
        string fertilizerDate;
        string fertilizerType;
        string applicationMethod;
        string expectedEffect;
        string[] images; // 🆕 Danh sách ảnh minh chứng
        uint256 timestamp;
    }

    struct Harvest {
        string harvestDate;
        string estimatedQuantity;
        string actualQuantity;
        string quality;
        string harvestMethod;
        string[] images; // 🆕 Danh sách ảnh minh chứng
        uint256 timestamp;
    }

    struct Distribution {
        string distributorName;
        string distributorPartner;
        string distributionDate;
        string transportMethod;
        string storageConditions;
        string[] images; // 🆕 Danh sách ảnh minh chứng
        uint256 timestamp;
    }

    struct ProductProcesses {
        FarmingProcess[] farmingProcesses;
        Medicine[] medicines;
        Fertilizer[] fertilizers;
        Harvest[] harvests;
        Distribution[] distributions;
    }

    // mapping productCode => toàn bộ quy trình
    mapping(string => ProductProcesses) private processes;

    // ====== 1️⃣ Ghi quy trình canh tác ======
    function addFarmingProcess(
        string memory productCode,
        string memory detail,
        string memory nameProcess,
        string memory source,
        string memory plantingDate,
        string[] memory images
    ) public {
        processes[productCode].farmingProcesses.push(
            FarmingProcess({
                detail: detail,
                nameProcess: nameProcess,
                source: source,
                plantingDate: plantingDate,
                images: images,
                timestamp: block.timestamp
            })
        );
    }

    // ====== 2️⃣ Ghi sử dụng thuốc bảo vệ thực vật ======
    function addMedicine(
        string memory productCode,
        string memory nameMedicine,
        string memory quantity,
        string memory medicineDate,
        string memory medicineType,
        string memory applicationMethod,
        string[] memory images
    ) public {
        processes[productCode].medicines.push(
            Medicine({
                nameMedicine: nameMedicine,
                quantity: quantity,
                medicineDate: medicineDate,
                medicineType: medicineType,
                applicationMethod: applicationMethod,
                images: images,
                timestamp: block.timestamp
            })
        );
    }

    // ====== 3️⃣ Ghi sử dụng phân bón ======
    function addFertilizer(
        string memory productCode,
        string memory nameFertilizer,
        string memory quantity,
        string memory fertilizerDate,
        string memory fertilizerType,
        string memory applicationMethod,
        string memory expectedEffect,
        string[] memory images
    ) public {
        processes[productCode].fertilizers.push(
            Fertilizer({
                nameFertilizer: nameFertilizer,
                quantity: quantity,
                fertilizerDate: fertilizerDate,
                fertilizerType: fertilizerType,
                applicationMethod: applicationMethod,
                expectedEffect: expectedEffect,
                images: images,
                timestamp: block.timestamp
            })
        );
    }

    // ====== 4️⃣ Ghi thu hoạch ======
    function addHarvest(
        string memory productCode,
        string memory harvestDate,
        string memory estimatedQuantity,
        string memory actualQuantity,
        string memory quality,
        string memory harvestMethod,
        string[] memory images
    ) public {
        processes[productCode].harvests.push(
            Harvest({
                harvestDate: harvestDate,
                estimatedQuantity: estimatedQuantity,
                actualQuantity: actualQuantity,
                quality: quality,
                harvestMethod: harvestMethod,
                images: images,
                timestamp: block.timestamp
            })
        );
    }

    // ====== 5️⃣ Ghi phân phối ======
    function addDistribution(
        string memory productCode,
        string memory distributorName,
        string memory distributorPartner,
        string memory distributionDate,
        string memory transportMethod,
        string memory storageConditions,
        string[] memory images
    ) public {
        processes[productCode].distributions.push(
            Distribution({
                distributorName: distributorName,
                distributorPartner: distributorPartner,
                distributionDate: distributionDate,
                transportMethod: transportMethod,
                storageConditions: storageConditions,
                images: images,
                timestamp: block.timestamp
            })
        );
    }

    // ====== 6️⃣ Lấy toàn bộ quy trình ======
    function getAllProcesses(string memory productCode)
        public
        view
        returns (
            FarmingProcess[] memory,
            Medicine[] memory,
            Fertilizer[] memory,
            Harvest[] memory,
            Distribution[] memory
        )
    {
        ProductProcesses storage p = processes[productCode];
        return (
            p.farmingProcesses,
            p.medicines,
            p.fertilizers,
            p.harvests,
            p.distributions
        );
    }
}
