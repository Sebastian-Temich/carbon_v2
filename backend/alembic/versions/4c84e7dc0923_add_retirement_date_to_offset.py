"""add retirement date to offset

Revision ID: 4c84e7dc0923
Revises: c1e7869df2f2
Create Date: 2023-02-23 15:22:24.708833

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = '4c84e7dc0923'
down_revision = 'c1e7869df2f2'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('offsets', sa.Column('retirement_date', sa.DateTime(timezone=True), nullable=True), schema='carbon')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('offsets', 'retirement_date', schema='carbon')
    # ### end Alembic commands ###
