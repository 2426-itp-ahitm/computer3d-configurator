import Foundation

class ShoppingCartService {
    func fetchCart(cartId: Int, completion: @escaping (Result<ShoppingCart, Error>) -> Void) {
        guard let url = URL(string: "\(Config.backendBaseURL)/api/shoppingcart/get-by-id/\(cartId)") else { return }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let data = data else {
                completion(.failure(NSError(domain: "No data", code: -1)))
                return
            }

            do {
                let cart = try JSONDecoder().decode(ShoppingCart.self, from: data)
                completion(.success(cart))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
}
