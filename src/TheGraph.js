import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const url = "https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph";

const CenterText = styled.div`
  font-size: 24px;
  margin-top: 112px;
  text-align: center;
  margin-bottom: 16px;
`

const MarketBorder = styled.div`
  // border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  gap:20px;
  margin: 20px;
  justify-content: center;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  height: 364px;
  margin-left: 16px;
`

const CenterButton = styled.div`
  text-align: center;
  margin-top: 24px;
`

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "white" : "black"};
  color: ${props => props.primary ? "white" : "white"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blueviolet;
  border-radius: 3px;
`;

const Input = styled.input`
  width: 900px;
  height: 25px;
  font-size: 2rem;
  font-family: Helvetica;
  text-align: center;
`


function TheGraph() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [images, setImages] = useState([]);
  // any time something updates with your component, it will run useEffect
  // on first time of component mount or deps change
  useEffect(() => {
    setImages([]);
    getRandomCharacter();
  }, []);
  return (
    <div>
      <CenterText>
        <Input onChange={e => setInput(e.target.value)}/>
      </CenterText>
      
      {/* <ImageContainer>
        <Image src={imageUrl}/>
        <Image src={imageUrl}/>
        <Image src={imageUrl}/>
      </ImageContainer> */}
      {/* <MarketBorder>
        <Image border="1px" w="200px" h="200px" src={imageUrl} alt="tv" objectFit="cover" />      
        <Image border="1px" w="200px" h="200px" src={imageUrl} alt="tv" objectFit="cover" /> 
        <Image border="1px" w="200px" h="200px" src={imageUrl} alt="tv" objectFit="cover" />
        <Image border="1px" w="200px" h="200px" src={imageUrl} alt="tv" objectFit="cover" />   
        <Image border="1px" w="200px" h="200px" src={imageUrl} alt="tv" objectFit="cover" />
        <Image border="1px" w="200px" h="200px" src={imageUrl} alt="tv" objectFit="cover" />
        <Image border="1px" w="200px" h="200px" src={imageUrl} alt="tv" objectFit="cover" />
        <Image border="1px" w="200px" h="200px" src={imageUrl} alt="tv" objectFit="cover" />
      </MarketBorder> */}
      {images.map((image, index) => {
            return (
                <Image src={image}/>
            )
      })}
      <CenterButton>
        <Button colorScheme="white" variant="solid" onClick={getRandomCharacter}>Refresh Character</Button>
      </CenterButton>
      
    </div>
  )

  async function getRandomCharacter() {
    const query = `{
      owners(first: 10, where:{id: "0x5f8E477B694859Cd6B792cD1cec9Dea319be53a5"}) {
        tokens {
          tokenID
          tokenURI
        }
      }
    }`;
    const response = await axios.post(url, {
      query,
      // variables: TODO
    });
    console.log(response);
    let arrayResponse = response.data.data.owners[0].tokens;
    let uris = [];
    arrayResponse.forEach((element, index) => {
      uris.push(element.tokenURI);
    });

    let tempImages = [];

    for(let i = 0; i < uris.length; i++) {
      try {
        let response = await axios.get(uris[i]);
        tempImages.push(response.data.image);
      } catch (err) {
        console.log(err);
      }
      
    }
    setImages(tempImages);
    
  }
}






export default TheGraph;