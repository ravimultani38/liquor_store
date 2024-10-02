document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    document.getElementById('logout-button').addEventListener('click', function() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                window.location.href = '/login.html';
            }
        });
    });

    document.getElementById('add-product-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            image: formData.get('image')
        };

        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        }).then(response => response.json()).then(product => {
            console.log('Product added:', product);
            event.target.reset();
            loadProducts();
        }).catch(error => {
            console.error('Error adding product:', error);
        });
    });

    document.getElementById('update-product-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const productId = formData.get('id');
        const newPrice = parseFloat(formData.get('price'));

        fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: newPrice })
        }).then(response => response.json()).then(product => {
            console.log('Product price updated:', product);
            event.target.reset();
            loadProducts();
        }).catch(error => {
            console.error('Error updating product price:', error);
        });
    });

    function loadProducts() {
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                const dropdown = document.getElementById('product-dropdown');
                dropdown.innerHTML = '<option value="" disabled selected>Select a product</option>';
                products.forEach(product => {
                    const option = document.createElement('option');
                    option.value = product.id;
                    option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
                    dropdown.appendChild(option);
                });
                M.FormSelect.init(dropdown);
            })
            .catch(error => {
                console.error('Error loading products:', error);
            });
    }

    loadProducts();
});
document.getElementById('logout-button').addEventListener('click', function() {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.location.href = '/';
        }
    });
});
