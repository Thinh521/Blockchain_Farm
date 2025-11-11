// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CompanyRegistry {
    struct Company {
        bytes32 id;                 // hash của số đăng ký
        string name;                // Tên công ty
        address wallet;             // Ví công ty
        string registrationNumber;  // Số đăng ký
        string location;            // Địa điểm
        string productionType;      // ✅ Loại hình sản xuất
        string[] images;            // Danh sách hình ảnh (IPFS hash / URL)
        bool isRegistered;          // T    rạng thái đã đăng ký
    }

    mapping(bytes32 => Company) public companies;
    uint256 public totalCompanies;

    event CompanyRegistered(
        bytes32 indexed id,
        string name,
        address wallet,
        string registrationNumber,
        string location,
        string productionType,      // ✅ emit thêm field này
        string[] images
    );

    /// @notice Đăng ký công ty mới
    function registerCompany(
        string memory _name,
        address _wallet,
        string memory _registrationNumber,
        string memory _location,
        string memory _productionType,  // ✅ truyền thêm param
        string[] memory _images
    ) public returns (bytes32) {
        require(_wallet != address(0), "Invalid wallet address");

        // ✅ id là hash của số đăng ký
        bytes32 companyId = keccak256(abi.encodePacked(_registrationNumber));
        require(!companies[companyId].isRegistered, "Company already registered");

        companies[companyId] = Company({
            id: companyId,
            name: _name,
            wallet: _wallet,
            registrationNumber: _registrationNumber,
            location: _location,
            productionType: _productionType, // ✅ lưu loại hình
            images: _images,
            isRegistered: true
        });

        totalCompanies++;

        emit CompanyRegistered(
            companyId,
            _name,
            _wallet,
            _registrationNumber,
            _location,
            _productionType, // ✅ emit loại hình
            _images
        );

        return companyId;
    }

    /// @notice Lấy thông tin công ty theo id (hash của số đăng ký)
    function getCompany(bytes32 _id) public view returns (Company memory) {
        require(companies[_id].isRegistered, "Company not found");
        return companies[_id];
    }

    /// @notice Lấy thông tin công ty theo số đăng ký (contract tự hash)
    function getCompanyByRegNumber(string memory _registrationNumber) public view returns (Company memory) {
        bytes32 companyId = keccak256(abi.encodePacked(_registrationNumber));
        require(companies[companyId].isRegistered, "Company not found");
        return companies[companyId];
    }
}
