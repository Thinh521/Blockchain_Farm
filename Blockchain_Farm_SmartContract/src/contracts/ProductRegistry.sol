// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ProductRegistry {
    struct Product {
        string farmCode;       // mã farm liên kết
        string productCode;    // mã sản phẩm duy nhất
        string name;           // tên sản phẩm
        string categoryName;   // tên danh mục sản phẩm
        uint256 quantity;      // số lượng
        uint256 price;         // giá
        string description;    // mô tả
        string image;          // link ảnh (IPFS / URL)
        bool exists;           // cờ kiểm tra tồn tại
    }

    // mapping productCode => Product
    mapping(string => Product) private products;

    // danh sách productCode
    string[] private productCodes;

    // mapping farmCode => danh sách productCode
    mapping(string => string[]) private productsByFarm;

    // mapping categoryName => danh sách productCode
    mapping(string => string[]) private productsByCategory;

    // Danh sách tất cả categoryName
    string[] private allCategories;

    // Kiểm tra danh mục đã tồn tại chưa
    mapping(string => bool) private categoryExists;

    // Events
    event ProductRegistered(
        string farmCode,
        string productCode,
        string name,
        string categoryName,
        uint256 quantity,
        uint256 price
    );

    event ProductUpdated(string productCode, uint256 quantity, uint256 price);
    event CategoryUpdated(string productCode, string oldCategory, string newCategory);
    event ProductDeleted(string productCode);

    /// @notice Đăng ký sản phẩm mới
    function registerProduct(
        string memory _farmCode,
        string memory _productCode,
        string memory _name,
        string memory _categoryName,
        uint256 _quantity,
        uint256 _price,
        string memory _description,
        string memory _image
    ) external {
        require(!products[_productCode].exists, "Product already exists");

        products[_productCode] = Product({
            farmCode: _farmCode,
            productCode: _productCode,
            name: _name,
            categoryName: _categoryName,
            quantity: _quantity,
            price: _price,
            description: _description,
            image: _image,
            exists: true
        });

        productCodes.push(_productCode);
        productsByFarm[_farmCode].push(_productCode);
        productsByCategory[_categoryName].push(_productCode);

        // Nếu category mới -> thêm vào danh sách allCategories
        if (!categoryExists[_categoryName]) {
            allCategories.push(_categoryName);
            categoryExists[_categoryName] = true;
        }

        emit ProductRegistered(_farmCode, _productCode, _name, _categoryName, _quantity, _price);
    }

    /// @notice Lấy thông tin sản phẩm theo productCode
    function getProduct(string memory _productCode) external view returns (Product memory) {
        require(products[_productCode].exists, "Product does not exist");
        return products[_productCode];
    }

    /// @notice Lấy danh sách sản phẩm theo farmCode
    function getProductsByFarm(string memory _farmCode) external view returns (Product[] memory) {
        string[] memory codes = productsByFarm[_farmCode];
        Product[] memory result = new Product[](codes.length);
        for (uint256 i = 0; i < codes.length; i++) {
            result[i] = products[codes[i]];
        }
        return result;
    }

    /// @notice Lấy danh sách sản phẩm theo categoryName
    function getProductsByCategory(string memory _categoryName) external view returns (Product[] memory) {
        string[] memory codes = productsByCategory[_categoryName];
        Product[] memory result = new Product[](codes.length);
        for (uint256 i = 0; i < codes.length; i++) {
            result[i] = products[codes[i]];
        }
        return result;
    }

    /// @notice Lấy toàn bộ sản phẩm
    function getAllProducts() external view returns (Product[] memory) {
        Product[] memory result = new Product[](productCodes.length);
        for (uint256 i = 0; i < productCodes.length; i++) {
            result[i] = products[productCodes[i]];
        }
        return result;
    }

    /// @notice Cập nhật số lượng và giá sản phẩm
    function updateProduct(
        string memory _productCode,
        uint256 _quantity,
        uint256 _price
    ) external {
        require(products[_productCode].exists, "Product does not exist");
        products[_productCode].quantity = _quantity;
        products[_productCode].price = _price;

        emit ProductUpdated(_productCode, _quantity, _price);
    }

    /// @notice Cập nhật danh mục sản phẩm
    function updateCategory(
        string memory _productCode,
        string memory _newCategory
    ) external {
        require(products[_productCode].exists, "Product does not exist");
        string memory oldCategory = products[_productCode].categoryName;

        // Xóa product khỏi danh mục cũ
        string[] storage oldList = productsByCategory[oldCategory];
        for (uint256 i = 0; i < oldList.length; i++) {
            if (keccak256(bytes(oldList[i])) == keccak256(bytes(_productCode))) {
                oldList[i] = oldList[oldList.length - 1];
                oldList.pop();
                break;
            }
        }

        // Cập nhật danh mục mới
        products[_productCode].categoryName = _newCategory;
        productsByCategory[_newCategory].push(_productCode);

        // Nếu danh mục mới chưa có, thêm vào danh sách
        if (!categoryExists[_newCategory]) {
            allCategories.push(_newCategory);
            categoryExists[_newCategory] = true;
        }

        emit CategoryUpdated(_productCode, oldCategory, _newCategory);
    }

    /// @notice Xóa sản phẩm
    function deleteProduct(string memory _productCode) external {
        require(products[_productCode].exists, "Product does not exist");

        string memory farmCode = products[_productCode].farmCode;
        string memory categoryName = products[_productCode].categoryName;

        delete products[_productCode];
        emit ProductDeleted(_productCode);

        // (Tuỳ chọn) có thể xóa khỏi mapping productsByFarm và productsByCategory
    }

    /// ✅ @notice Lấy tất cả tên danh mục sản phẩm
    function getAllCategoryName() external view returns (string[] memory) {
        return allCategories;
    }
}
