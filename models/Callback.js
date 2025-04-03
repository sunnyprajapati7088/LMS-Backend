const Callback = mongoose.model('Callback', new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    experienceLevel: String,
    termsAccepted: Boolean,
    createdAt: { type: Date, default: Date.now }
  }));
  