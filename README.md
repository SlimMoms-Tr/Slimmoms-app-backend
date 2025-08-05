# SlimMoms App Backend

SlimMoms uygulamasının backend API'si. Günlük kalori takibi, besin günlüğü ve kullanıcı kimlik doğrulama işlevlerini sağlar.

## 🚀 Özellikler

- **Authentication**: JWT tabanlı kullanıcı kimlik doğrulama
- **Calorie Tracking**: Günlük kalori hesaplama ve takip
- **Food Diary**: Besin günlüğü yönetimi
- **Product Search**: Besin ürünleri arama
- **API Documentation**: Swagger/OpenAPI dokümantasyonu
- **Security**: Rate limiting, CORS, Helmet güvenlik önlemleri

## 🛠️ Teknolojiler

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Swagger** - API documentation
- **Pino** - Logging

## 📋 Gereksinimler

- Node.js 18+
- MongoDB Atlas hesabı

## 🔧 Kurulum

1. **Repository'yi klonlayın:**

```bash
git clone https://github.com/SlimMoms-Tr/Slimmoms-app-backend.git
cd Slimmoms-app-backend
```

2. **Bağımlılıkları yükleyin:**

```bash
npm install
```

3. **Environment variables oluşturun:**

```bash
# .env dosyası oluşturun
PORT=3000
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_url
MONGODB_DB=your_database_name
JWT_SECRET=your_jwt_secret_key_here
RENDER_EXTERNAL_URL=https://your-backend-domain.onrender.com
```

4. **Uygulamayı çalıştırın:**

```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Endpoints

### Authentication

- `POST /auth/register` - Kullanıcı kaydı
- `POST /auth/login` - Kullanıcı girişi
- `POST /auth/logout` - Kullanıcı çıkışı
- `POST /auth/refresh` - Token yenileme

### Calorie

- `POST /calorie/public-calories` - Genel kalori hesaplama
- `POST /calorie/private-calories` - Kullanıcıya özel kalori hesaplama

### Daily

- `GET /daily` - Günlük besin listesi
- `PATCH /daily/add-product` - Besin ekleme
- `PATCH /daily/delete-product` - Besin silme

### Products

- `GET /products` - Tüm ürünleri listele
- `GET /products/search` - Ürün arama

## 📖 API Dokümantasyonu

Swagger dokümantasyonuna erişmek için:

```
http://localhost:3000/api-docs
```

## 🚀 Deployment

### Render.com

1. Render.com'da yeni Web Service oluşturun
2. GitHub repository'nizi bağlayın
3. Environment variables'ları ayarlayın
4. Build Command: `npm run build`
5. Start Command: `npm start`

## 📝 Scripts

- `npm run dev` - Development server
- `npm start` - Production server
- `npm run build` - Build documentation
- `npm run lint` - ESLint kontrolü

## 🔒 Güvenlik

- Rate limiting (15 dakikada 10,000 istek)
- CORS protection
- Helmet security headers
- JWT token validation
- Input validation

## 📞 İletişim

Proje hakkında sorularınız için: [GitHub Issues](https://github.com/SlimMoms-Tr/Slimmoms-app-backend/issues)
