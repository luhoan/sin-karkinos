# Sin Karkinos

A web demo for a fine-tuned Vision Transformer that classifies brain MRI scans
into four categories — glioma, meningioma, pituitary tumor, and no tumor,
with Grad-CAM visualizations for explainability.

## What's here

- `FEW_SHOT_Cancer_Classification_via_Fine_Tuning_a_Vision_Transformer_with_Grad_CAM_for_Explainability.ipynb` —
  training notebook: few-shot fine-tuning of the model, plus the Grad-CAM
  implementation used to visualize what the model is looking at.
- `config.json` / `pytorch_model.bin` — the fine-tuned SegFormer
  (`SegformerForSemanticSegmentation`) checkpoint used by the demo.
- `index.html` / `main.js` — a static front end that showcases the model's
  predictions and Grad-CAM overlays in the browser.
- `0_No_Tumor.png`, `1_Glioma_Tumor.png`, `2_Meningioma_Tumor.png`,
  `3_Pituitary_Tumor.png` — sample scans for each class, used in the demo/notebook.
- `neural-network.png` — architecture diagram.

## Running the notebook

Open the `.ipynb` in Jupyter or Colab and run top to bottom; it walks through
loading the base model, fine-tuning on the four tumor classes, and generating
Grad-CAM heatmaps over sample scans.

## Running the web demo

`index.html` is static — serve the folder locally (e.g. `python -m http.server`)
and open it in a browser. It loads `main.js`, which reads the model
outputs/config to render predictions and heatmaps.

## Disclaimer

This is a research/educational project, not a diagnostic tool. Predictions
should not be used for real medical decisions.
