<template>
<div :rooms="rooms">
    
  </div>
</template>
<script>

export default{
    name:"testR",
    data(){
        return{"rooms":
            [{name:"Luxury Suite",price:65, photo:"luxurySuite1.jpg", child:1,
    amen:"hot shower", desc:"These are the best rooms in the house. “Atitlan” and “Toliman” each have one king size bed and one single bed, a private bathroom with raging hot water, private balcony with hammock and stunning view across the lake to the volcanoes"},
    {name:"Luxury Cabin",price:44,  photo:"luxuryCabin1.jpg",child:1,
    amen:"hot shower", desc:"Modern room with extra privacy from the basic rooms offered. Private bathroom and gas heated hot water."},
    {name:"Luxury Room",price:40,  photo:"luxuryRoom1.jpg",child:0,
    amen:"hot shower", desc:"Modern room with extra privacy. Private bathroom and gas heated hot water."},
    {name:"Family Suite", price:52,  photo:"familySuite1.jpg",child:3,
    amen:"hot showers",desc:"Our two other luxury suites all come equipped with electricity, private baths with raging hot showers, private balconies, and plenty of space to stretch out. “Cerro de Oro” and “Sarito” both have one double bed and two singles. Ideal for both travelling families or groups looking for a little more comfort and privacy, these two rooms have capacity for 4 people and have the same luxury as it’s neighbours but less of a view as it is downstairs."},
    {name:"3 Beds standard dorm",price:9, photo:"3bedDorm1.jpg",child:0,
    amen:"lockers",desc:"Standard dormitory with electricity and shared bathroom."},
    {name:"Private Room with Twin Beds",price:14, photo:"privateRoomTwin1.jpg",child:0,
    amen:"lockers",desc:"Budget private with two twin beds and shared bathrooms"} ]}
        
    }
}
</script>