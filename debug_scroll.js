
const container = document.getElementById('timeline')?.querySelector('.overflow-x-auto');
if (container) {
  console.log('Container found');
  const event = new WheelEvent('wheel', {
    deltaY: 100,
    bubbles: true,
    cancelable: true
  });
  
  const prevented = !container.dispatchEvent(event);
  console.log('Event dispatched, default prevented:', prevented);
  console.log('Scroll Left before:', container.scrollLeft);
  
  // Simulate what the handler does
  if (!prevented) {
     container.scrollLeft += 100;
  }
   console.log('Scroll Left after:', container.scrollLeft);

} else {
  console.log('Container not found');
}
