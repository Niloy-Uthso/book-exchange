import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full h-96 ">
  <div id="item1" className="carousel-item  w-full">
    <img
      src="https://i.ibb.co.com/xKP1sHdT/flying-magic-books-library-367534733.jpg"
      className="w-full" />
  </div>
  <div id="item2" className="carousel-item w-full">
    <img
      src="https://i.ibb.co.com/chB3sYLF/Famous-Indian-Authors-and-Their-Most-Famous-Books-1750939949570.jpg"
      className="w-full" />
  </div>
  <div id="item3" className="carousel-item w-full">
    <img
      src="https://i.ibb.co.com/zhbcq1wX/kids-reading-books-fantasy-library-two-children-long-surreal-wooden-chairs-papers-flying-around-them.jpg"
      className="w-full" />
  </div>
  <div id="item4" className="carousel-item w-full">
    <img
      src="https://i.ibb.co.com/j9jpMmjC/secret-library-book-cover-2.jpg"
      className="w-full" />
  </div>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
  <a href="#item4" className="btn btn-xs">4</a>
</div>
        </div>
    );
};

export default Banner;
