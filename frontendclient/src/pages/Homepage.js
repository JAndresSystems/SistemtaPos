import React,{useState,useEffect} from 'react';
import DefaultLayout from '../components/DefaulLayout';
import axios from 'axios'
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';


const Homepage = () => {

  const [itemsData,setItemData] = useState([]);
  const [selectedCategory,setSelectedCategory]= useState('drinks');

const categories = [

{
  name:'drinks',
  imageUrl:'https://www.touchbistro.com/wp-content/uploads/2020/05/guide-to-well-drinks-tequila-sunrise.jpg'
},
{
  name:'rice',
  imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSZibWrQdaG2lTh3D7an9ijsyu62PxAMZlQ&s'
},
{
  name:'noodles',
  imageUrl:'https://i.blogs.es/fa9b0b/01-noodles-con-verduras/650_1200.jpeg'
},
{
  name:'Technology',
  imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQF8bD1ElxwAKJ1cwd3t0Je55Hhrsakqz88Q&s'
},


]

  const dispatch = useDispatch();
useEffect(() => {

const getAllItems = async () =>{

    try {
      dispatch({
        type:'SHOW_LOADING'
      });
      const {data} = await axios.get('/api/items/get-item')
     dispatch({type:'HIDE_LOADING'});
      setItemData(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }

};
 getAllItems();

},[dispatch])

  return (
  
  <DefaultLayout>
  <div className='d-flex'>
    {categories.map(category =>(
      <div 
      key={category.name} 
      className={`d-flex category ${selectedCategory === category.name && "category-active"}`}
      onClick={() => setSelectedCategory(category.name)} // Usar setSelectedCategory
    >
      <h4>{category.name}</h4>
      <img 
        src={category.imageUrl}
        alt={category.name} 
        height="40" 
        width="60"
      />
    </div>
    

    ))}
  </div>
   <Row>
      {
        itemsData
        .filter((i)=> i.category === selectedCategory)
        .map(item =>(
          <Col xs={24} lg={6} md={12} sm={6}>
          <ItemList key={item.id} item={item} />
          </Col>
        ))
      }
   </Row>
    
  </DefaultLayout>
  );
};

export default Homepage;
