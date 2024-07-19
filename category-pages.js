document.addEventListener('DOMContentLoaded', function() {
    console.log('category pages')
    // Get all elements with the class 'category-item-img-wrapper'
    const items = document.querySelectorAll('.category-item-img-wrapper-wrapper');
    
    // Iterate over the items and add 'is-last' class to every other item
    items.forEach((item, index) => {
        if (index % 2 === 1) {
            item.classList.add('is-last');
        }
    });
});