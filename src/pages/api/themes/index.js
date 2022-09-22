import firebase from '../../../data/firebase'

export default async (req,res) => {

  let themesRef = firebase.firestore().collection('themes');
  let allThemes = await themesRef.get()
  const themes = []

  for(const doc of allThemes.docs){
    themes.push({
      id: doc.id,
      ...doc.data()
    })
  }

  res.status(200).json({ themes });
}