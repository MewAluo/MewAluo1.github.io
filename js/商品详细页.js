// 只保留数量增减的JavaScript
const qtyBtns = document.querySelectorAll('.qty-btn');
console.log('数量增减按钮:', qtyBtns);
qtyBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const input = document.querySelector('#quantity');
        let val = parseInt(input.value);
        if (this.textContent === '+') {
            input.value = val < 99? val + 1 : 99;
        } else {
            input.value = val > 1? val - 1 : 1;
        }
    });
});

const cartBtn = document.querySelector('.cart-btn');
console.log('加入购物车按钮:', cartBtn);
const quantityInput = document.querySelector('#quantity');
console.log('数量输入框:', quantityInput);

if (cartBtn && quantityInput) {
    cartBtn.addEventListener('click', function () {
        const productName = document.querySelector('.product-title').textContent;
        const productPrice = document.querySelector('.price').textContent.replace('¥', '');

        try {
            // 获取购物车数据，如果没有则初始化一个空数组
            let cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

            // 创建新的商品对象
            const newItem = {
                name: productName,
                price: productPrice,
                quantity: quantityInput.value
            };

            // 将新商品添加到购物车数组中
            cartItems.push(newItem);

            // 将更新后的购物车数据存储到 localStorage 中
            localStorage.setItem('shoppingCart', JSON.stringify(cartItems));

            // 调试语句，检查数据是否正确存储
            console.log('购物车数据:', cartItems);

            // 可以在这里添加提示信息或跳转到购物车页面的代码
            // 例如：window.location.href ='shopping-cart.html';
        } catch (error) {
            console.error('localStorage 操作出错:', error);
        }
    });
} else {
    console.error('无法找到加入购物车按钮或数量输入框');
}