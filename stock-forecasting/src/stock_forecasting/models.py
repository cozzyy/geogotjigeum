from __future__ import annotations

from dataclasses import dataclass
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import HistGradientBoostingClassifier, GradientBoostingRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


@dataclass
class DirectionModels:
    logistic: Pipeline
    tree: Pipeline


def make_logistic(C: float = 0.5, balanced: bool = False) -> Pipeline:
    return Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
        ("model", LogisticRegression(
            max_iter=3000,
            class_weight="balanced" if balanced else None,
            C=C,
            solver="lbfgs",
        )),
    ])


def make_direction_models() -> DirectionModels:
    # Legacy baseline kept for comparison.
    logistic = make_logistic(C=0.5, balanced=True)
    tree = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("model", HistGradientBoostingClassifier(
            max_depth=4, learning_rate=0.05, max_iter=250,
            l2_regularization=1.0, random_state=42,
        )),
    ])
    return DirectionModels(logistic=logistic, tree=tree)


def make_quantile_model(alpha: float) -> Pipeline:
    return Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("model", GradientBoostingRegressor(
            loss="quantile", alpha=alpha, n_estimators=80,
            learning_rate=0.04, max_depth=3, min_samples_leaf=12,
            random_state=42,
        )),
    ])
