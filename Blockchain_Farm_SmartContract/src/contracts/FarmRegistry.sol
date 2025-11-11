// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract FarmRegistry {
 
    struct Farm {
        string farmCode;       // mã định danh duy nhất cho farm
        string fullname;       // tên đầy đủ của nông dân
        string nameFarm;       // tên trang trại
        string userId;         // liên kết tới user (dạng string)
        string email;          // email liên hệ
        string phone;          // số điện thoại
        string description;    // mô tả
        string location;       // vị trí
        uint256 area;          // diện tích (m2)
        string[] images;       // danh sách hình ảnh
        bool exists;           // cờ kiểm tra tồn tại
    }

    // mapping farmCode => Farm
    mapping(string => Farm) private farms;
    // lưu danh sách farmCode
    string[] private farmCodes;

    // mapping userId => danh sách farmCode
    mapping(string => string[]) private farmsByUser;

    // Events
    event FarmRegistered(string farmCode, string userId, string nameFarm);
    event FarmUpdated(string farmCode);

    /**
     * @notice Đăng ký farm mới
     */
    function registerFarm(
        string memory _farmCode,
        string memory _fullname,
        string memory _nameFarm,
        string memory _userId,       // nhập userId trực tiếp
        string memory _email,
        string memory _phone,
        string memory _description,
        string memory _location,
        uint256 _area,
        string[] memory _images
    ) external {
        require(!farms[_farmCode].exists, "Farm already exists");

        Farm storage f = farms[_farmCode];
        f.farmCode = _farmCode;
        f.fullname = _fullname;
        f.nameFarm = _nameFarm;
        f.userId = _userId;
        f.email = _email;
        f.phone = _phone;
        f.description = _description;
        f.location = _location;
        f.area = _area;
        f.images = _images;
        f.exists = true;

        farmCodes.push(_farmCode);
        farmsByUser[_userId].push(_farmCode);

        emit FarmRegistered(_farmCode, _userId, _nameFarm);
    }

    /**
     * @notice Lấy thông tin farm theo farmCode
     */
    function getFarm(string memory _farmCode) external view returns (Farm memory) {
        require(farms[_farmCode].exists, "Farm does not exist");
        return farms[_farmCode];
    }

    /**
     * @notice Lấy tất cả farm của một user theo userId
     */
    function getFarmsByUser(string memory _userId) 
        external 
        view 
        returns (Farm[] memory) 
    {
        string[] memory codes = farmsByUser[_userId];

        Farm[] memory result = new Farm[](codes.length);
        for (uint256 i = 0; i < codes.length; i++) {
            result[i] = farms[codes[i]];
        }
        return result;
    }

    /**
     * @notice Lấy danh sách tất cả các farms
     */
    function getAllFarms() external view returns (Farm[] memory) {
        Farm[] memory result = new Farm[](farmCodes.length);
        for (uint256 i = 0; i < farmCodes.length; i++) {
            result[i] = farms[farmCodes[i]];
        }
        return result;
    }
}
