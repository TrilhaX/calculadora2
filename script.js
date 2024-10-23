document.getElementById('dropdownCalculos').addEventListener('click', function() {
    const calculoSection = document.getElementById('calculoContainer');
    
    if (calculoSection.style.display === 'none' || calculoSection.style.display === '') {
        calculoSection.style.display = 'flex';
        calculoSection.style.flexDirection = 'column';
    } else {
        calculoSection.style.display = 'none';
        hr.style.display = 'none';
    }
});