# 🕌 Islamic Prayer Times App

A beautiful and responsive React application that provides accurate Islamic prayer times for any city worldwide using the [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api).

## ✨ Features

- **Location-based Prayer Times**: Enter any city and country to get accurate prayer times
- **Beautiful UI**: Modern, responsive design with Islamic-inspired colors
- **Six Prayer Times**: Displays Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha timings
- **Real-time Data**: Fetches current prayer times from the reliable Aladhan API
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Error Handling**: Provides clear feedback for invalid locations or network issues

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prayertime
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎯 How to Use

1. **Enter Location**: Type in your city name and country in the input fields
2. **Get Prayer Times**: Click the "Get Prayer Times" button
3. **View Results**: The app will display all six prayer times for your location
4. **Try Different Cities**: Enter different locations to get prayer times anywhere in the world

### Example Locations to Try

- New York, USA
- London, UK
- Mecca, Saudi Arabia
- Istanbul, Turkey
- Jakarta, Indonesia
- Cairo, Egypt

## 🔧 API Details

This app uses the [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api) which provides:

- Accurate prayer times based on geographical location
- Multiple calculation methods
- Support for worldwide locations
- Free usage without API key requirements

### API Endpoint Used

```
GET https://api.aladhan.com/v1/timingsByAddress/{date}?address={city},{country}&method=2
```

## 🎨 Design Features

- **Gradient Background**: Beautiful purple gradient background
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Hover Effects**: Interactive elements with smooth transitions
- **Responsive Grid**: Prayer time cards automatically adjust to screen size
- **Loading States**: Visual feedback during API calls
- **Error Messages**: Clear error handling with helpful messages

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🌟 Future Enhancements

- [ ] Add Qibla direction feature
- [ ] Include Islamic calendar dates
- [ ] Add prayer time notifications
- [ ] Support for different calculation methods
- [ ] Dark/Light theme toggle
- [ ] Save favorite locations
- [ ] Multiple language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Aladhan API](https://aladhan.com) for providing the prayer times data
- React team for the excellent framework
- Islamic community for inspiration and guidance

---

**May Allah accept our prayers and grant us guidance. Ameen.** 🤲
