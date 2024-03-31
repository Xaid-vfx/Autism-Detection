from flask import Flask, request, jsonify
import pickle
from collections import Counter
from flask_cors import CORS

# List to store loaded models
models = []

# File names of the .pkl files
model_files = ["AdaBoostClassifier.pkl", "DecisionTreeClassifier.pkl", "ExtraTreesClassifier.pkl","KNearestNeighbor.pkl","NaiveBayes.pkl","RandomForestClassifier.pkl","SGDClassifier.pkl","SupportVectorMachine.pkl" ]

# Load each serialized model from the .pkl files

for model_file in model_files:
    with open('models/' + model_file, 'rb') as f:
        models.append(pickle.load(f))

# Now loaded_models contains all the loaded models

app = Flask(__name__)

CORS(app)

@app.route('/')
def test():
    return 'Server running'

# Route to handle prediction requests
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get test case from the request
        test_case = request.json['test_case']

        # Perform prediction using the loaded models

        for idx, model in enumerate(models):
            predictions = model.predict(test_case)
            print(f"Model {idx+1} predictions:", predictions)

        # Determine the majority prediction
        majority_prediction = Counter(predictions).most_common(1)[0][0]

        # Construct response
        response = {
            'majority_prediction': int(majority_prediction)
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': f'Error during prediction: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)