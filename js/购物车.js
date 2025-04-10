try {
    // 从 localStorage 中获取购物车数据
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartTableBody = document.getElementById('cart-table-body');
    const totalPriceElement = document.getElementById('total-price');
    const shippingInfoContainer = document.getElementById('shipping-info-container');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const confirmBtn = document.getElementById('confirm-btn');

    let totalPrice = 0;

    // 遍历购物车数据并添加到表格中
    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const priceCell = document.createElement('td');
        const quantityCell = document.createElement('td');
        const actionCell = document.createElement('td');

        nameCell.textContent = item.name;
        priceCell.textContent = `¥${item.price}`;
        quantityCell.textContent = item.quantity;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '移除';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', function () {
            // 从 cartItems 中移除当前商品
            cartItems.splice(index, 1);
            // 将更新后的购物车数据存储到 localStorage 中
            localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
            // 刷新页面显示
            location.reload();
        });

        actionCell.appendChild(removeBtn);

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(actionCell);

        cartTableBody.appendChild(row);

        // 计算总价
        totalPrice += parseFloat(item.price) * parseInt(item.quantity);
    });

    // 更新总价显示
    totalPriceElement.textContent = `¥${totalPrice.toFixed(2)}`;

    // 结算按钮点击事件
    checkoutBtn.addEventListener('click', function () {
        if (cartItems.length === 0) {
            alert('购物车为空，无法结算。');
        } else {
            shippingInfoContainer.style.display = 'flex';
        }
    });

    // 确认并提交按钮点击事件
    confirmBtn.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        if (name && address && phone) {
            alert(`收货信息已确认！\n收货人姓名: ${name}\n收货地址: ${address}\n联系电话: ${phone}`);
            // 这里可以添加将收货信息发送到服务器的代码（暂未实现）
            // 清空购物车
            localStorage.removeItem('shoppingCart');
            location.reload();
        } else {
            alert('请填写完整的收货信息');
        }
    });
} catch (error) {
    console.error('读取 localStorage 数据出错:', error);
}