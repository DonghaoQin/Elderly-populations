<template>
    <div class="comment-section">
        <button @click="goBack" class="back-button">Back to Homepage</button>
  
        <h2>Leave a Comment and Rating</h2>
        
        <div class="comment-form">
            <textarea v-model="newComment" placeholder="Write your comment here..."></textarea>
            
            <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ 'selected': star <= newRating }" @click="setRating(star)">
                    ★
                </span>
            </div>
            
            <button @click="submitComment">Submit</button>
        </div>
  
        <div class="comments-list">
            <h3>Comments and Ratings</h3>
            <div v-if="comments.length > 0">
                <div v-for="(comment, index) in comments" :key="index" class="comment">
                    <p v-html="sanitize(comment.text)"></p>
                    <div class="rating">
                        <span v-for="star in 5" :key="star" class="star" :class="{ 'selected': star <= comment.rating }" @click="rateComment(index, star)">
                            ★
                        </span>
                    </div>
                    <p v-if="submittedIndexes.includes(index)" class="feedback-message">Your rating has been submitted</p>
                </div>
            </div>
            <p v-else>No comments yet. Be the first to leave a comment!</p>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const comments = ref([
    { text: "This health charity has been helping those who need it most, and their efforts and dedication truly move me.", rating: 5 },
    { text: "I'm very grateful to this charity organization; their programs not only improve the health of the community but also give many people new hope.", rating: 4 },
    { text: "Participating in health charity activities gives me an unparalleled sense of fulfillment; seeing the smiles of the beneficiaries is my greatest motivation.", rating: 4 },
    { text: "This organization is truly changing people's lives through education and preventive measures, helping them avoid serious health issues.", rating: 5 },
    { text: "I donate to this charity because I know every penny is spent wisely, making a real contribution to improving public health.", rating: 5 },
    { text: "Their health programs allow many elderly people to continue living independently and with dignity, and I am proud to support such a cause.", rating: 4 },
    { text: "Seeing the care and professionalism this charity displays while helping vulnerable groups makes me believe we can create a better future together.", rating: 5 },
    { text: "This health charity not only provides medical services but also focuses on mental health, offering comprehensive support that brings peace of mind.", rating: 4 },
    { text: "As a volunteer, I’ve witnessed firsthand the results of this organization's work; the help and care they provide to the community are invaluable.", rating: 5 },
    { text: "Health charity is not just about helping others; it's about shaping a healthier, more loving society, and that's exactly what this organization has been doing.", rating: 3 }
]);

const newComment = ref('');
const newRating = ref(0);
const submittedIndexes = ref([]);  // To track which comments have been rated

const sanitize = (input) => {
    const element = document.createElement('div'); //  sanitize data
    element.innerText = input;
    return element.innerHTML;
};

const setRating = (rating) => {
    newRating.value = rating;
};

const submitComment = () => {
    if (newComment.value && newRating.value) {
        comments.value.push({ text: sanitize(newComment.value), rating: newRating.value });
        newComment.value = '';
        newRating.value = 0;
    }
};

const rateComment = (index, rating) => {
    comments.value[index].rating = rating;
    if (!submittedIndexes.value.includes(index)) {
        submittedIndexes.value.push(index);
    }
};

const goBack = () => {
    router.push('/');
};
</script>
  
<style scoped>
.comment-section {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
}
  
.back-button {
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: #d08989;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
  
.back-button:hover {
    background-color: #c57878;
}
  
.comment-form textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
}
  
.rating {
    font-size: 1.5rem;
    margin-bottom: 10px;
}
  
.star {
    cursor: pointer;
    color: #ccc;
}
  
.star.selected {
    color: #ffd700;
}
  
.comments-list {
    margin-top: 20px;
}
  
.comment {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
  
.feedback-message {
    color: green;
    font-size: 0.9rem;
    margin-top: 5px;
}
</style>
