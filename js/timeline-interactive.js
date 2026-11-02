// (part of Version 7 Redesign) Expandable timeline cards
(function () {
    function init() {
        document.querySelectorAll('.timeline-horizontal').forEach(function (group) {
            var items = group.querySelectorAll('.timeline-item');

            items.forEach(function (item, i) {
                var date = item.querySelector('h4');
                if (date) {
                    if (date.classList.contains('timeline-date-aa')) item.dataset.type = 'aa';
                    else if (date.classList.contains('timeline-date-exp')) item.dataset.type = 'exp';
                    else item.dataset.type = 'edu';
                }
                group.dataset.type = items[0].dataset.type;
                item.style.setProperty('--tl-index', i);

                var p = item.querySelector('p');
                if (!p || !p.textContent.trim()) return;

                var details = document.createElement('div');
                details.className = 'timeline-details';
                var inner = document.createElement('div');
                inner.className = 'timeline-details-inner';
                p.parentNode.insertBefore(details, p);
                details.appendChild(inner);
                inner.appendChild(p);

                var toggle = document.createElement('div');
                toggle.className = 'timeline-toggle';
                toggle.innerHTML = '<span class="timeline-toggle-label">Details</span><i class="fa-solid fa-chevron-down"></i>';
                item.appendChild(toggle);

                item.classList.add('is-expandable');
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');
                item.setAttribute('aria-expanded', 'false');

                function setOpen(open) {
                    item.classList.toggle('is-open', open);
                    item.setAttribute('aria-expanded', String(open));
                    toggle.querySelector('.timeline-toggle-label').textContent = open ? 'Hide' : 'Details';
                }

                item.addEventListener('click', function () {
                    var open = !item.classList.contains('is-open');
                    group.querySelectorAll('.timeline-item.is-open').forEach(function (other) {
                        if (other !== item) other.dispatchEvent(new CustomEvent('timeline:close'));
                    });
                    setOpen(open);
                });
                item.addEventListener('timeline:close', function () { setOpen(false); });
                item.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.click();
                    }
                });
            });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
