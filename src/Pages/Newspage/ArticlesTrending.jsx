import React from 'react'
import { projectFirebase, timestamp } from '../../firebase/config';

  // posts.js
export const ArticlesAPI = {
    // Calculate trending score based on likes, views, and time decay
    calculateTrendingScore: ( views, Timestamp) => {
      const now = timestamp.now().toDate();
      const postTime = Timestamp.toDate();
      const hoursSincePost = (now - postTime) / (1000 * 60 * 60);
      
      // Trending score formula:
      // (likes * 1.5 + views * 0.5) / (hoursSincePost + 2)^1.8
      // This gives more weight to likes than views and applies time decay
      return (views * 1) / Math.pow(hoursSincePost + 2, 1.8);
    },
  
// Fetch trending posts
getTrendingArticles: async (limit = 10) => {
  try {
    let ref = projectFirebase.collection("Article").orderBy("createdAt", "desc");
    const snapshot = await ref.get();
    let articles = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const trendingScore = ArticlesAPI.calculateTrendingScore(
        data.view,
        data.createdAt,
      );
      articles.push({
        id: doc.id,
        ...data,
        trendingScore
      });
    });
    // Sort by trending score
    articles.sort((a, b) => b.trendingScore - a.trendingScore);
    return articles.slice(0, limit);
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw error;
  }
}
}
          
 


      

