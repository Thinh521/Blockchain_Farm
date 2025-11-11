// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BusinessRegistry {
    struct Business {
        bytes32 id;                 // hash của số đăng ký
        string name;                // Tên cá nhân / hộ kinh doanh
        address wallet;             // Ví đăng ký
        string registrationNumber;  // Số đăng ký
        string location;            // Địa điểm
        string businessType;        // Loại hình kinh doanh
        string[] images;            // Danh sách hình ảnh giấy phép
        bool isRegistered;          // Trạng thái đã đăng ký
    }

    mapping(bytes32 => Business) public businesses;
    uint256 public totalBusinesses;

    event BusinessRegistered(
        bytes32 indexed id,
        string name,
        address wallet,
        string registrationNumber,
        string location,
        string businessType,
        string[] images
    );

    /// @notice Đăng ký business mới
    function registerBusiness(
        string memory _name,
        address _wallet,
        string memory _registrationNumber,
        string memory _location,
        string memory _businessType,
        string[] memory _images
    ) public returns (bytes32) {
        require(_wallet != address(0), "Invalid wallet address");

        bytes32 businessId = keccak256(abi.encodePacked(_registrationNumber));
        require(!businesses[businessId].isRegistered, "Business already registered");

        businesses[businessId] = Business({
            id: businessId,
            name: _name,
            wallet: _wallet,
            registrationNumber: _registrationNumber,
            location: _location,
            businessType: _businessType,
            images: _images,
            isRegistered: true
        });

        totalBusinesses++;

        emit BusinessRegistered(businessId, _name, _wallet, _registrationNumber, _location, _businessType, _images);

        return businessId;
    }

    /// @notice Lấy thông tin theo id
    function getBusiness(bytes32 _id) public view returns (Business memory) {
        require(businesses[_id].isRegistered, "Business not found");
        return businesses[_id];
    }

    /// @notice Lấy thông tin theo số đăng ký
    function getBusinessByRegNumber(string memory _registrationNumber) public view returns (Business memory) {
        bytes32 businessId = keccak256(abi.encodePacked(_registrationNumber));
        require(businesses[businessId].isRegistered, "Business not found");
        return businesses[businessId];
    }
}
