document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the class 'category-item-img-wrapper'
    const items = document.querySelectorAll('.category-item-img-wrapper');
    
    // Iterate over the items and add 'is-last' class to every other item
    items.forEach((item, index) => {
        if (index % 2 === 1) {
            item.classList.add('is-last');
        }
    });
});