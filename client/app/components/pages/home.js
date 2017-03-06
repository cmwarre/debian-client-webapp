import React from 'react';
import { Carousel } from 'react-bootstrap';


export default function(props){
    return(
        <div className="container">
           <h1>Home</h1>
            <Carousel>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/img/carousel.png" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>This is the first slide</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/img/carousel.png" />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>This is the second slide</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={900} height={500} alt="900x500" src="/img/carousel.png" />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>This is the third slide</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="container marketing">
                <div className="row">
                    <div className="col-lg-4">
                        <h2>Heading</h2>
                        <p>
                            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id
                            nibh
                            ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at
                            eros.
                            Praesent commodo cursus magna.
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <h2>Heading</h2>
                        <p>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem
                            nec
                            elit.
                            Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus
                            commodo,
                            tortor mauris condimentum nibh.
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <h2>Heading</h2>
                        <p>
                            Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Vestibulum id
                            ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor
                            mauris
                            condimentum nibh, ut fermentum massa justo sit amet risus.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}